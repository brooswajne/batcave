import * as assert from 'assert';
import {
	iteratorFilter,
	iteratorMap,
	iteratorReduce,
	iteratorWrap,
} from './index';

const iteratorMethods = [
	'filter',
	'map',
	'reduce',
];
const test = Object.assign(assert, {
	isChainable(obj: any) {
		const isIterator = Object.prototype.hasOwnProperty.call(obj, Symbol.iterator);
		assert(isIterator, 'does not implement Symbol.iterator');
		const available = new Set(Object.keys(obj));
		for (const method of iteratorMethods) assert(available.has(method), `missing ${method}`);
	},
	yields(iterator: Iterable<any>, values: any[]) {
		const yielded = [];
		for (const value of iterator) yielded.push(value);
		assert.deepEqual(yielded, values);
	},
});

describe('iteratorFilter', function( ) {
	it('filters values', function( ) {
		const array = [ 1, 2, 3, 4, 5, 6 ];
		const even = iteratorFilter(array, (val) => val % 2 === 0);
		test.yields(even, [ 2, 4, 6 ]);
	});
	it('is chainable', function( ) {
		const array = [ 1, 2, 3, 4, 5, 6 ];
		const even = iteratorFilter(array, (val) => val % 2 === 0);
		test.isChainable(even);
		const four = even.filter((val) => val === 4);
		test.isChainable(four);
		test.yields(four, [ 4 ]);
	});
});

describe('iteratorMap', function( ) {
	it('maps values', function( ) {
		const array = [ 1, 2, 3, 4, 5, 6 ];
		const doubled = iteratorMap(array, (val) => val * 2);
		test.yields(doubled, [ 2, 4, 6, 8, 10, 12 ]);
	});
	it('is chainable', function( ) {
		const array = [ 1, 2, 3, 4, 5, 6 ];
		const doubled = iteratorMap(array, (val) => val * 2);
		test.isChainable(doubled);
		const halved = doubled.map((val) => val / 2);
		test.isChainable(halved);
		test.yields(halved, array);
	});
});

describe('iteratorReduce', function( ) {
	it('reduces with an initial value', function( ) {
		const array = [ 1, 2, 3, 4, 5 ];
		const sum = iteratorReduce(array, (sum, num) => sum + num, 15);
		test.equal(sum, 30);
	});
	it('reduces with no initial value', function( ) {
		const array = [ 1, 2, 3, 4, 5 ];
		const sum = iteratorReduce(array, (sum, num) => sum + num);
		test.equal(sum, 15);
	});
});

describe('iteratorWrap', function( ) {
	it('returns a chainable iterator', function( ) {
		const array = [ 1, 2, 3, 4, 5, 6 ];
		const iterator = iteratorWrap(array);
		test.isChainable(iterator);
		test.yields(iterator, array);

		const even = iteratorWrap(array)
			.filter(x => x % 2 === 0);
		test.yields(even, [ 2, 4, 6 ]);

		const halfeven = iteratorWrap(array)
			.filter(x => x % 2 === 0)
			.map(x => x / 2);
		test.yields(halfeven, [ 1, 2, 3 ]);

		const sum = iteratorWrap(array)
			.filter(x => x % 2 === 0)
			.map(x => x / 2)
			.reduce((sum, num) => sum + num);
		test.equal(sum, 6);
	});
});
