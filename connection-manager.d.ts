import { Connection } from "./connection.js";
export declare class ConnectionManager extends EventTarget {
    #private;
    constructor();
    addEventListener(type: 'connect', ev: (this: MessagePort, ev: Event & {
        data: Connection;
    }) => any, options?: Parameters<MessagePort['addEventListener']>['2']): void;
    addEventListener(...args: Parameters<MessagePort['addEventListener']>): void;
    getConnections(): SetIterator<Connection>;
    postMessageAll(...args: Parameters<MessagePort['postMessage']>): void;
}
