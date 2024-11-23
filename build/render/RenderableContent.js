import { toUnique } from "../array/index.js";
import { error } from "../console/index.js";
import { stringifyJson } from "../json/stringifyJson.js";
function createSection(index = 0, title = null, content = [], columns = []) {
    return { index, title: title, content, columns };
}
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
    append(...content) {
        const _sections = this._sections;
        const section = _sections.length
            ? _sections[_sections.length - 1]
            : this._appendSection(createSection());
        section.content.push(...content);
    }
    appendBlock(...content) {
        if (content.length) {
            content[0] = `<blockquote>${content[0]}`;
            const lastIndex = content.length - 1;
            content[lastIndex] = `${content[lastIndex]}</blockquote>`;
            this.append(...content);
        }
    }
    appendColumnedSection(...columns) {
        return this._appendSection(createSection(this._sections.length, null, [], columns));
    }
    appendTitledSection(title, ...content) {
        return this._appendSection(createSection(this._sections.length, title, content));
    }
    appendSection(...content) {
        return this._appendSection(createSection(this._sections.length, null, content));
    }
    appendSections(...sections) {
        const _sections = this._sections;
        _sections.push(...sections);
        _sections.forEach((section, index) => section.index = index);
    }
    findMatches(regex) {
        const matches = [];
        this.sections.forEach(section => {
            section.content.forEach(s => {
                regex.lastIndex = -1;
                matches.push(...(regex.exec(s) ?? []));
            });
        });
        return matches.filter(toUnique);
    }
    setColor(color) {
        this.color = color ?? undefined;
    }
    setThumbnailUrl(url) {
        this.thumbnailUrl = url ?? undefined;
    }
    setTitle(title) {
        this.title = title;
    }
    renderSection(section) {
        const title = section.title ? `<h2>${section.title}</h2>` : ``;
        const contents = section.content.map(s => `<p>${s}</p>`).join("");
        return `${title}<div>${contents}</div>`;
    }
    toRenderableContent() {
        return this;
    }
    toString() {
        const title = this.title ? `<h1>${this.title}</h1>` : ``;
        const sections = this.sections.map(section => this.renderSection(section)).join("");
        return title + sections;
    }
    static resolve(resolvable) {
        if (!resolvable) {
            return null;
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
        return null;
    }
}
