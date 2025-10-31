import { Connection } from "./connection.js";
export class ConnectionManager extends EventTarget {
    #connections;
    constructor() {
        super();
        this.#connections = new Set();
        globalThis.addEventListener("connect", async (event) => {
            const port = event.ports[0];
            const onReady = new Promise((res) => port.addEventListener("message", res, { once: true }));
            port.start();
            const { data: id } = await onReady;
            port.postMessage(null);
            const conn = new Connection(port, id);
            conn.addEventListener("disconnect", () => this.#connections.delete(conn), { once: true });
            this.#connections.add(conn);
            this.dispatchEvent(new MessageEvent("connect", { data: conn }));
        });
    }
    addEventListener(...args) {
        /// @ts-expect-error
        return super.addEventListener(...args);
    }
    getConnections() {
        return this.#connections.values();
    }
    postMessageAll(...args) {
        for (const conn of this.#connections.values()) {
            conn.postMessage(...args);
        }
    }
}
