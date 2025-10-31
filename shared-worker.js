export class SharedWorker extends EventTarget {
    #port;
    #onReady;
    constructor(...args) {
        super();
        const id = crypto.randomUUID();
        const worker = new globalThis.SharedWorker(...args);
        this.#onReady = new Promise((res) => worker.port.addEventListener("message", res, { once: true }));
        navigator.locks.request(id, async (_lock) => {
            worker.port.postMessage(id);
            worker.port.start();
            // Never resolve to hold the lock until page close
            await new Promise(() => { });
        });
        this.#port = worker.port;
    }
    postMessage(...args) {
        this.#onReady.then(() => this.#port.postMessage(...args));
    }
    addEventListener(...args) {
        this.#onReady.then(() => this.#port.addEventListener(...args));
    }
    removeEventListener(...args) {
        this.#onReady.then(() => this.#port.removeEventListener(...args));
    }
}
