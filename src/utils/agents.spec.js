import { extractIdRole } from './agents';

describe('extractIdRole', () => {
	it('should return an empty array if we have no agents', () => {
		expect(extractIdRole()).toEqual([]);
	});

	it('should return the right structure', () => {
		expect(
			extractIdRole([
				{ id: '1', roles: ['A', 'B'] },
				{ id: '2', roles: ['B'] },
			])
		).toEqual([
			{ id: '1', role: 'A' },
			{ id: '1', role: 'B' },
			{ id: '2', role: 'B' },
		]);
	});
});
