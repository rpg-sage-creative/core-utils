export class ProgressTracker {
    label;
    total;
    interval;
    countComplete = 0;
    lastInterval = 0;
    percentComplete = 0;
    started = false;
    finished = false;
    handlers = new Map();
    on(eventName, handler) {
        if (!this.handlers.has(eventName)) {
            this.handlers.set(eventName, new Set());
        }
        this.handlers.get(eventName).add(handler);
        return this;
    }
    handle(eventName, message) {
        const eventData = { eventName, tracker: this, message };
        const handlers = this.handlers.get(eventName);
        handlers?.forEach(handler => handler(eventData));
    }
    constructor(label, total = 0, interval = 10) {
        this.label = label;
        this.total = total;
        this.interval = interval;
    }
    start(total) {
        if (this.finished) {
            this.handle("error", `${this.label} Start Failed: Already Finished!`);
        }
        else if (this.started) {
            this.handle("error", `${this.label} Start Failed: Already Started!`);
        }
        else {
            if (total !== undefined) {
                this.total = total;
            }
            if (this.total > 0) {
                this.started = true;
                this.handle("started", `${this.label} Started.`);
                this.status({ force0: true });
            }
            if (!this.started) {
                this.handle("error", `${this.label} Start Failed: Invalid Total (${this.total})`);
            }
        }
    }
    increment(count = 1) {
        if (this.finished) {
            this.handle("error", `${this.label} Increment Failed: Already Finished!`);
        }
        else {
            if (!this.started) {
                this.start();
            }
            this.handle("increment", `${this.label} increment: count = ${count}`);
            this.countComplete += count;
            if (this.started && !this.finished) {
                this.percentComplete = Math.floor(100 * this.countComplete / this.total);
                if (this.percentComplete % this.interval === 0 && this.percentComplete !== this.lastInterval) {
                    this.status();
                    this.lastInterval = this.percentComplete;
                }
            }
        }
    }
    status({ force0 = false, force100 = false } = {}) {
        if (!this.started) {
            this.handle("status", `${this.label} status ... Not Started!`);
        }
        else if (this.finished) {
            this.handle("status", `${this.label} status ... Finished!`);
        }
        else {
            let percentComplete = this.percentComplete;
            if (force0) {
                percentComplete = 0;
            }
            else if (force100) {
                percentComplete = 100;
            }
            this.handle("status", `${this.label} (${this.total}) ... ${percentComplete}%`);
        }
    }
    error(message) {
        const msg = message
            ? `Error: ${message}`
            : `Error!`;
        this.handle("error", `${this.label} (${this.total}) ... Error: ${msg}`);
    }
    finish(force100 = false) {
        if (!this.started) {
            this.handle("error", `${this.label} Finish Failed: Not Started!`);
        }
        else if (this.finished) {
            this.handle("error", `${this.label} Finish Failed: Already Finished!`);
        }
        else {
            if (this.lastInterval !== 100) {
                this.status({ force100 });
            }
            this.finished = true;
            this.handle("finished", `${this.label} Finished.`);
        }
    }
}
