export class SharedWorker extends EventTarget {
  #port: MessagePort;

  constructor(
    ...args: ConstructorParameters<typeof globalThis.SharedWorker>
  ) {
    super();

    const id = crypto.randomUUID();
    const worker = new globalThis.SharedWorker(...args);

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
    return this.#port.postMessage(...args);
  }

  addEventListener(
    ...args: Parameters<MessagePort['addEventListener']>
  ) {
    return this.#port.addEventListener(...args);
  }

  removeEventListener(
    ...args: Parameters<MessagePort['removeEventListener']>
  ) {
    return this.#port.removeEventListener(...args);
  }
}
