import {
	transformRoleFromIgesa,
	transformASIFromIgesa,
	transformAgentsFromIgesa,
} from './transform';

describe('transformRoleFromIgesa', () => {
	it('should return an empty array if we have no data', () => {
		expect(transformRoleFromIgesa()).toEqual([]);
	});

	it('should return the right structure', () => {
		expect(
			transformRoleFromIgesa([
				{
					groupes: [
						{
							cn: '1',
							description: 'label1',
							personnes: [
								{ uid: '1', cn: 'CN1', ou: 'stamp1' },
								{ uid: '2', cn: 'CN2', ou: 'stamp2' },
								{ uid: '3', cn: 'CN3', ou: 'stamp3' },
							],
						},
					],
				},
			])
		).toEqual([
			{
				id: '1',
				label: 'label1',
				persons: [
					{ id: '1', label: 'CN1', stamp: 'stamp1' },
					{
						id: '2',
						label: 'CN2',
						stamp: 'stamp2',
					},
					{
						id: '3',
						label: 'CN3',
						stamp: 'stamp3',
					},
				],
			},
		]);
	});
});

const ASI = [
	{ cn: 'id ASI group', personnes: [{ cn: 'Sir', uid: '1', ou: 'stamp1' }] },
];

describe('transformASIFromIgesa', () => {
	it('should return an empty array if we have no data', () => {
		expect(transformASIFromIgesa()()).toEqual([]);
	});

	it('should return the right structure', () => {
		expect(transformASIFromIgesa()(ASI)).toEqual([
			{
				id: 'id ASI group',
				label: 'ASI group label',
				persons: [{ label: 'Sir', id: '1', stamp: 'stamp1' }],
			},
		]);
	});
});

const agents = [
	{ uid: 1, cn: 'One', mail: '...' },
	{ uid: 2, cn: 'Two', mail: '...' },
	{ uid: 3, cn: 'Three', mail: '...' },
];

describe('transformAgentsFromIgesa', () => {
	it('should return an empty array if we have no agent', () => {
		expect(transformAgentsFromIgesa()).toEqual([]);
	});

	it('should return the right structure', () => {
		expect(transformAgentsFromIgesa(agents)).toEqual([
			{
				id: 1,
				label: 'One',
			},
			{
				id: 2,
				label: 'Two',
			},
			{
				id: 3,
				label: 'Three',
			},
		]);
	});
});
