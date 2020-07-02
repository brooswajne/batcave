declare type every = typeof Array.prototype.every;
export declare function every(array: any[], ...args: Parameters<every>): Promise<ReturnType<every>>;
declare type filter = typeof Array.prototype.filter;
export declare function filter(array: any[], ...args: Parameters<filter>): Promise<ReturnType<filter>>;
declare type ResolveType<T> = T extends PromiseLike<infer U> ? U : T;
declare type AsyncAction = (...args: any[]) => any;
interface AsyncQueue {
    /** Adds an asynchronous action to the queue */
    push<T>(action: (...args: any[]) => T): Promise<ResolveType<T>>;
    /** Clears all pending actions in the queue */
    clear(): void;
    /** Returns a set of all currently running actions */
    running(): Set<AsyncAction>;
}
export declare function queue(concurrencyLimit?: number): AsyncQueue;
export {};
