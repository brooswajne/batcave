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
export declare class TimeoutExpiredError extends Error {
    constructor(func: Function, time: number);
}
/**
 * Wraps a promise-returning function into another asynchronous
 * function which will reject if the original wrapped function
 * takes longer than the specified time to resolve.
 * @param {Function} func
 * The function to wrap.
 * @param {number} [ms=5000]
 * The time to wait before rejecting.
 * @param {object} [options]
 * @param {boolean} [options.rejectOnTimeout]
 * If false, the promise will just be left pending rather than
 * rejecting if the time limit expires.
 */
export declare function timeout<T extends any[], U>(func: (...args: T) => Promise<U>, ms?: number, { rejectOnTimeout, }?: {
    rejectOnTimeout?: boolean | undefined;
}): (...args: T) => Promise<U>;
export {};
