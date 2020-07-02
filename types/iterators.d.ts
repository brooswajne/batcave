export declare function filter<T>(iterator: Iterable<T>, filterFn: (value: T, index: number) => boolean, thisArg?: any): ChainableIterator<T>;
export declare function map<T, U>(iterator: Iterable<T>, mapFn: (value: T, index: number) => U, thisArg?: any): ChainableIterator<U>;
export declare function reduce<T>(iterator: Iterable<T>, reducer: (accumulator: T, value: T, index: number) => T): T;
export declare function reduce<T>(iterator: Iterable<T>, reducer: (accumulator: T, value: T, index: number) => T, initialValue: T): T;
export declare function reduce<T, U>(iterator: Iterable<T>, reducer: (accumulator: U, value: T, index: number) => U, initialValue: U): U;
interface ChainableIterator<T> extends Iterable<T> {
    [Symbol.iterator]: () => Iterator<T>;
    filter(filterFn: (value: T, index: number) => boolean, thisArg?: any): ChainableIterator<T>;
    map<U>(mapFn: (value: T, index: number) => U, thisArg?: any): ChainableIterator<U>;
    reduce(reducer: (accumulator: T, value: T, index: number) => T): T;
    reduce(reducer: (accumulator: T, value: T, index: number) => T, initialValue: T): T;
    reduce<U>(reducer: (accumulator: U, value: T, index: number) => U, initialValue: U): U;
}
export declare function wrap<T>(iterator: Iterable<T>): ChainableIterator<T>;
export {};
