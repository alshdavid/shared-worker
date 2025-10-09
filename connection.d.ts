export declare class Connection extends EventTarget {
    #private;
    constructor(port: MessagePort, id: string);
    id(): string;
    postMessage(...args: Parameters<MessagePort['postMessage']>): void;
    addEventListener(...args: Parameters<MessagePort['addEventListener']>): void;
    removeEventListener(...args: Parameters<MessagePort['removeEventListener']>): void;
}
