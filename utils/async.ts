/* Asynchronous versions of array methods */

type every = typeof Array.prototype.every;
export async function every(array: any[], ...args: Parameters<every>): Promise<ReturnType<every>> {
	const truth = await Promise.all(array.map(...args));
	return array.every((elt, idx) => truth[idx]);
}
type filter = typeof Array.prototype.filter;
export async function filter(array: any[], ...args: Parameters<filter>): Promise<ReturnType<filter>> {
	const truth = await Promise.all(array.map(...args));
	return array.filter((elt, idx) => truth[idx]);
}

/* More specialised async utilities */

type ResolveType<T> = T extends PromiseLike<infer U> ? U : T;

type AsyncAction = (...args: any[]) => any;
interface AsyncQueue {
	/** Adds an asynchronous action to the queue */
	push<T>(action: (...args: any[]) => T): Promise<ResolveType<T>>;
	/** Clears all pending actions in the queue */
	clear( ): void;
	/** Returns a set of all currently running actions */
	running( ): Set<AsyncAction>;
}
export function queue(concurrencyLimit = 2): AsyncQueue {
	// TODO: use a different data structure for more efficient shift/unshift
	// TODO: support setting action priority (requires better data structure)
	// TODO: support passing a label parameter for each action, so we have queue.remove(fn)

	type PromiseCallbacks = ({
		resolve: (value: any) => void,
		reject: (reason: any) => void,
	});

	const queue : AsyncAction[] = [];
	const promises = new WeakMap<AsyncAction, PromiseCallbacks>( );

	const running = new Set<AsyncAction>( );
	// starts running the next action in the queue, as long as it doesn't
	// take us over the concurrency limit
	function run( ) {
		if (running.size >= concurrencyLimit) return;
		if (queue.length === 0) return;

		const action = queue.shift( )!;
		if (!promises.has(action)) throw new Error(`Missing promise callbacks for queue action ${action.name}`);
		const { resolve, reject } = promises.get(action)!;
		running.add(action);
		Promise.resolve( )
			.then(action)
			.then(resolve, reject)
			.finally(function cleanup( ) {
				running.delete(action);
				promises.delete(action);
				run( ); // run next action if any are in the queue
			});
	}

	return {
		push(action) {
			type ActionResult = ResolveType<ReturnType<typeof action>>;
			const promise = new Promise<ActionResult>((resolve, reject) => {
				promises.set(action, { resolve, reject });
			});
			queue.push(action);
			Promise.resolve( ).then(run);
			return promise;
		},
		clear: ( ) => void (queue.length = 0),
		/** Returns an array of all currently running actions */
		running: ( ) => new Set(running),
	};
}

export class TimeoutExpiredError extends Error {
	constructor(func: Function, time: number) {
		const funcName = func.name || '<anonymous>';
		const msg = `Timeout-wrapped function ${funcName} took longer than ${time}ms to resolve`;
		super(msg);
		this.name = this.constructor.name;
	}
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
export function timeout<T extends any[], U>(func: (...args: T) => Promise<U>, ms = 5000, {
	rejectOnTimeout = true,
} = {}): (...args: T) => Promise<U> {
	return function timeoutified(this: any, ...args: T) {
		return new Promise((resolve, reject) => {
			let overran = false;
			const kill = setTimeout(( ) => {
				if (rejectOnTimeout) reject(new TimeoutExpiredError(func, ms));
				overran = true;
			}, ms);
			func.apply(this, args)
				.finally(( ) => clearTimeout(kill))
				.then((ret) => !overran && resolve(ret), (err) => !overran && reject(err));
		});
	};
}
