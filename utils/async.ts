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
