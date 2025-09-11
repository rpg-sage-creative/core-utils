export type Flags = `${"g" | ""}${"i" | ""}`;
type SelfCloseElement = "br" | "hr" | "img" | "input" | "link" | "meta";
export declare function isSelfCloseElement(element: string): element is SelfCloseElement;
export {};
