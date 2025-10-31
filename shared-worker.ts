export class SharedWorker extends EventTarget {
  #port: MessagePort;
  #onReady: Promise<void>

  constructor(
    ...args: ConstructorParameters<typeof globalThis.SharedWorker>
  ) {
    super();

    const id = crypto.randomUUID();
    const worker = new globalThis.SharedWorker(...args);
    this.#onReady = new Promise<void>((res) =>
      worker.port.addEventListener("message", res as any, { once: true })
    );

    navigator.locks.request(id, async (_lock) => {
      worker.port.postMessage(id);
      worker.port.start();
      // Never resolve to hold the lock until page close
      await new Promise(() => {});
    });

    this.#port = worker.port;
  }

  postMessage(
    ...args: Parameters<MessagePort['postMessage']>
  ) {
    this.#onReady.then(() => this.#port.postMessage(...args))
  }

  addEventListener(
    ...args: Parameters<MessagePort['addEventListener']>
  ) {
    this.#onReady.then(() => this.#port.addEventListener(...args))
  }

  removeEventListener(
    ...args: Parameters<MessagePort['removeEventListener']>
  ) {
    this.#onReady.then(() => this.#port.removeEventListener(...args))
  }
}
