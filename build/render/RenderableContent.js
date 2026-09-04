import { stringifyJson } from "@rsc-utils/json-utils";
import { toUnique } from "../array/index.js";
import { error } from "../console/index.js";
function createSection(index = 0, title, content = [], columns = []) {
    return { index, title, content, columns };
}
/**
 * @todo make the default html output a bootstrap card.
 * make the tostring accept "html" | "markdown" | "discord-markdown"
 * make a child in discord-utils that has:
 * - toPostArgs: creates discord message args for post style
 * - toEmbedArgs: creates discord message args for embed style
 * - toMessageArgs: creates discord message args for combo/hybrid style
 */
export class RenderableContent {
    title;
    _sections = [];
    _appendSection(section) {
        this._sections.push(section);
        return section;
    }
    paragraphDelimiter = "\n";
    thumbnailUrl;
    color;
    constructor(title) {
        this.title = title;
    }
    get sections() { return this._sections.slice(); }
    get columnedSections() { return this._sections.filter(s => s.columns?.length); }
    get titledSections() { return this._sections.filter(s => s.title); }
    get untitledSections() { return this._sections.filter(s => !s.title); }
    /** Append the given content to the last section. */
    append(...content) {
        const _sections = this._sections;
        const section = _sections.length
            ? _sections[_sections.length - 1]
            : this._appendSection(createSection());
        content.forEach(item => section.content.push(item));
    }
    /** Prepends <blockquote> to the first content given, appends </blockquote> to the last content given, then passes to .append(...) */
    appendBlock(...content) {
        if (content.length) {
            content[0] = `<blockquote>${content[0]}`;
            const lastIndex = content.length - 1;
            content[lastIndex] = `${content[lastIndex]}</blockquote>`;
            this.append(...content);
        }
    }
    appendHeader(h, content) {
        this.append(`<${h}>${content}</${h}>`);
    }
    /** Creates, appends, and returns a columned section. */
    appendColumnedSection(...columns) {
        return this._appendSection(createSection(this._sections.length, undefined, [], columns));
    }
    /** Creates, appends, and returns a titled section. */
    appendTitledSection(title, ...content) {
        return this._appendSection(createSection(this._sections.length, title, content));
    }
    /** Creates, appends, and returns a section. */
    appendSection(...content) {
        return this._appendSection(createSection(this._sections.length, undefined, content));
    }
    /** Append the given sections. */
    appendSections(...sections) {
        const { _sections } = this;
        // add new sections
        sections.forEach(section => _sections.push(section));
        // update all indexes
        _sections.forEach((section, index) => section.index = index);
    }
    /**
     * Expects a RegExp with a global flag.
     * Returns all unique matches.
     */
    findMatches(regex) {
        const matches = [];
        this.sections.forEach(section => {
            // TODO: see why i was gonna use this --> if (section.title) matches.push(...(section.title.match(regex) || []));
            section.content.forEach(content => {
                regex.lastIndex = -1;
                const contentMatches = regex.exec(content) ?? [];
                contentMatches.forEach(match => matches.push(match));
            });
        });
        return matches.filter(toUnique);
    }
    /** Sets the border color. */
    setColor(color) {
        this.color = color ?? undefined;
    }
    /** Sets the thumbnail image url. */
    setThumbnailUrl(url) {
        this.thumbnailUrl = url ?? undefined;
    }
    /** Sets the title. */
    setTitle(title) {
        this.title = title;
    }
    /** The default renderer for a section. */
    renderSection(section) {
        const title = section.title ? `<h2>${section.title}</h2>` : ``;
        const contents = section.content.map(s => `<p>${s}</p>`).join("");
        return `${title}<div>${contents}</div>`;
    }
    /** Required to implement Renderable. By default returns "this". */
    toRenderableContent() {
        return this;
    }
    /** Renders all contents to html. */
    toString() {
        const title = this.title ? `<h1>${this.title}</h1>` : ``;
        const sections = this.sections.map(section => this.renderSection(section)).join("");
        return title + sections;
    }
    /** Resolve the given value to a RenderableContent. */
    static resolve(resolvable) {
        if (!resolvable) {
            return undefined;
        }
        if (typeof (resolvable) === "string") {
            const renderableContent = new RenderableContent();
            renderableContent.append(resolvable);
            return renderableContent;
        }
        else {
            try {
                return resolvable.toRenderableContent();
            }
            catch (ex) {
                const toStringValue = Object.prototype.toString.call(resolvable) ?? "No toString";
                const constructorName = resolvable?.constructor?.name ?? "No Constructor";
                error(`Unable to resolve Renderable: ${toStringValue} (${constructorName}); "toRenderableContent in resolvable === ${"toRenderableContent" in resolvable}`, stringifyJson(resolvable));
            }
        }
        return undefined;
    }
}
