/* Iterator transform methods */

export function filter<T>(
	iterator: Iterable<T>,
	filterFn: (value: T, index: number) => boolean,
	thisArg?: any,
): ChainableIterator<T> {
	return wrap((function * baseFilter( ) {
		let idx = 0;
		for (const value of iterator) {
			const isPassing = filterFn.call(thisArg, value, idx++);
			if (isPassing) yield value;
		}
	})( ));
}
export function map<T, U>(
	iterator: Iterable<T>,
	mapFn: (value: T, index: number) => U,
	thisArg?: any,
): ChainableIterator<U> {
	return wrap((function * baseMap( ) {
		let idx = 0;
		for (const value of iterator) yield mapFn.call(thisArg, value, idx++);
	})( ));
}
export function reduce<T>(
	iterator: Iterable<T>,
	reducer: (accumulator: T, value: T, index: number) => T,
) : T;
export function reduce<T>(
	iterator: Iterable<T>,
	reducer: (accumulator: T, value: T, index: number) => T,
	initialValue: T,
) : T;
export function reduce<T, U>(
	iterator: Iterable<T>,
	reducer: (accumulator: U, value: T, index: number) => U,
	initialValue: U,
): U;
export function reduce(iterator: any, reducer: any, initialValue?: any) {
	let idx = 0;
	let accumulator = initialValue;
	for (const value of iterator) {
		if (idx === 0 && initialValue === undefined) {
			accumulator = value;
			idx += 1;
		} else accumulator = reducer(accumulator, value, idx++);
	}
	return accumulator;
}

/* Wrapper to allow chaining */

interface ChainableIterator<T> extends Iterable<T> {
	[ Symbol.iterator ]: ( ) => Iterator<T>;
	filter(
		filterFn: (value: T, index: number) => boolean,
		thisArg?: any,
	): ChainableIterator<T>;
	map<U>(
		mapFn: (value: T, index: number) => U,
		thisArg?: any,
	): ChainableIterator<U>;
	reduce(
		reducer: (accumulator: T, value: T, index: number) => T,
	) : T;
	reduce(
		reducer: (accumulator: T, value: T, index: number) => T,
		initialValue: T,
	) : T;
	reduce<U>(
		reducer: (accumulator: U, value: T, index: number) => U,
		initialValue: U,
	): U;
}
export function wrap<T>(iterator: Iterable<T>): ChainableIterator<T> {
	return {
		[Symbol.iterator]: function*( ) {
			yield* iterator;
		},
		filter: (...args) => filter(iterator, ...args),
		map: (...args) => map(iterator, ...args),
		reduce: (reducer: any, initialValue?: any) => reduce(iterator, reducer, initialValue),
	};
}
