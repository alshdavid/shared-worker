export class Connection extends EventTarget {
    #port;
    #id;
    constructor(port, id) {
        super();
        navigator.locks.request(id, (_lock) => {
            this.#port.dispatchEvent(new Event("disconnect"));
        });
        this.#port = port;
        this.#id = id;
    }
    id() {
        return this.#id;
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
