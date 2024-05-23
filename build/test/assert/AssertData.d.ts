type AssertCounts = {
    total: number;
    passed: number;
    failed: number;
};
type LabeledAssertCounts = AssertCounts & {
    label: string;
};
type AssertData = AssertCounts & {
    labeled: LabeledAssertCounts[];
};
/** Clears any assertion data. */
export declare function clearAssertData(): void;
/** Returns the current totals, or all 0s if no assertions have been incremented. */
export declare function getAssertData(): AssertData | null;
/**
 * Increments the total number of assertions.
 * If given true, the number of passed assertions is incremented.
 * Otherwise, the number of failed assertions is incremented;
 */
export declare function incrementAssertData(passed: boolean): void;
export {};
