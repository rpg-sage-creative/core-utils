/**
 * LogQueue allows you to queue up log writes and decide to send them later.
 * The primary use case is that you are iterating but only want to see log writes during certain conditions.
 * You simply use .add(...args) to add writes to the queue (the "initial" argument is always added).
 * Calling .log() will send the items to the appropriate logger (info, debug, warn, error, etc)
 * You can also call .logDiff() to add a "final" value to the queue and only log if it is a different object than "initial".
 * You can also call .logSame() to add a "final" value to the queue and only log if it is the same object as "initial".
 * NOTE: These two checks use ===, so a mutated object is still the same object.
*/
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
