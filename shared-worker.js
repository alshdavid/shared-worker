export class SharedWorker extends EventTarget {
    #port;
    constructor(...args) {
        super();
        const id = crypto.randomUUID();
        const worker = new globalThis.SharedWorker(...args);
        navigator.locks.request(id, async (_lock) => {
            worker.port.postMessage(id);
            worker.port.start();
            // Never resolve to hold the lock until page close
            await new Promise(() => { });
        });
        this.#port = worker.port;
    }
    postMessage(...args) {
        return this.#port.postMessage(...args);
    }
    addEventListener(...args) {
        return this.#port.addEventListener(...args);
    }
    removeEventListener(...args) {
        return this.#port.removeEventListener(...args);
    }
}
