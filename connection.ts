export class Connection extends EventTarget {
  #port: MessagePort;
  #id: string;

  constructor(
    port: MessagePort, 
    id: string,
  ) {
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
