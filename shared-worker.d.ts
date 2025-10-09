export declare class SharedWorker extends EventTarget {
    #private;
    constructor(...args: ConstructorParameters<typeof globalThis.SharedWorker>);
    postMessage(...args: Parameters<MessagePort['postMessage']>): void;
    addEventListener(...args: Parameters<MessagePort['addEventListener']>): void;
    removeEventListener(...args: Parameters<MessagePort['removeEventListener']>): void;
}
