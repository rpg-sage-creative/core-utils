import { debug } from "./debug.js";
export class LogQueue {
    fn;
    initial;
    logger;
    items;
    constructor(fn, initial, logger = debug) {
        this.fn = fn;
        this.initial = initial;
        this.logger = logger;
        this.items = [];
        this.add({ initial });
    }
    add(...items) {
        items.forEach(data => {
            this.items.push({ fn: this.fn, ...data });
        });
    }
    log(logger = this.logger) {
        this.items.forEach(item => logger(item));
    }
    logDiff(final) {
        this.add({ final });
        if (this.initial !== final) {
            this.log();
        }
    }
    logSame(final) {
        this.add({ final });
        if (this.initial === final) {
            this.log();
        }
    }
}
