export declare class LogQueue {
    fn: string;
    initial: unknown;
    logger: Function;
    /** array of objets to log */
    items: unknown[];
    constructor(fn: string, initial: unknown, logger?: Function);
    /** adds an object to the queue */
    add(...items: unknown[]): void;
    /** logs all the items in the queue */
    log(logger?: Function): void;
    /**
     * adds the given object to the queue.
     * logs all the items in the queue if: this.initial !== final
     */
    logDiff(final: unknown): void;
    /**
     * adds the given object to the queue.
     * logs all the items in the queue if: this.initial === final
     */
    logSame(final: unknown): void;
}
