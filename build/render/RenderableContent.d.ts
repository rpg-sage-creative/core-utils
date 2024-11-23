import type { Optional } from "../types/generics.js";
import type { Renderable, RenderableContentSection, RenderableContentSectionColumn } from "./types.js";
type HexColorString = `#${string}`;
/**
 * @todo make the default html output a bootstrap card.
 * make the tostring accept "html" | "markdown" | "discord-markdown"
 * make a child in discord-utils that has:
 * - toPostArgs: creates discord message args for post style
 * - toEmbedArgs: creates discord message args for embed style
 * - toMessageArgs: creates discord message args for combo/hybrid style
 */
export declare class RenderableContent implements Renderable {
    title?: string | undefined;
    private readonly _sections;
    private _appendSection;
    paragraphDelimiter: string;
    thumbnailUrl: string | undefined;
    color: HexColorString | undefined;
    constructor(title?: string | undefined);
    get sections(): RenderableContentSection[];
    get columnedSections(): RenderableContentSection[];
    get titledSections(): RenderableContentSection[];
    get untitledSections(): RenderableContentSection[];
    /** Append the given content to the last section. */
    append(...content: string[]): void;
    /** Prepends <blockquote> to the first content given, appends </blockquote> to the last content given, then passes to .append(...) */
    appendBlock(...content: string[]): void;
    /** Creates, appends, and returns a columned section. */
    appendColumnedSection(...columns: RenderableContentSectionColumn[]): RenderableContentSection;
    /** Creates, appends, and returns a titled section. */
    appendTitledSection(title: string, ...content: string[]): RenderableContentSection;
    /** Creates, appends, and returns a section. */
    appendSection(...content: string[]): RenderableContentSection;
    /** Append the given sections. */
    appendSections(...sections: RenderableContentSection[]): void;
    /**
     * Expects a RegExp with a global flag.
     * Returns all unique matches.
     */
    findMatches(regex: RegExp): string[];
    /** Sets the border color. */
    setColor(color: Optional<HexColorString>): void;
    /** Sets the thumbnail image url. */
    setThumbnailUrl(url: Optional<string>): void;
    /** Sets the title. */
    setTitle(title: string): void;
    /** The default renderer for a section. */
    protected renderSection(section: RenderableContentSection): string;
    /** Required to implement Renderable. By default returns "this". */
    toRenderableContent(): RenderableContent;
    /** Renders all contents to html. */
    toString(): string;
    /** Resolve the given value to a RenderableContent. */
    static resolve(resolvable: string | Renderable): RenderableContent | null;
}
export {};
