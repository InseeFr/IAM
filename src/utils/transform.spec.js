import { transformRoleFromIgesa, transformASIFromIgesa } from './transform';

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
								{ uid: '2', cn: 'CN1' },
								{ uid: '3', cn: 'CN3' },
								{ uid: '3', cn: 'CN4' },
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
					{ id: '2', label: 'CN1' },
					{
						id: '3',
						label: 'CN3',
					},
					{
						id: '3',
						label: 'CN4',
					},
				],
			},
		]);
	});
});

const ASI = [{ cn: 'id ASI group', personnes: [{ cn: 'Sir', uid: '1' }] }];

describe('transformASIFromIgesa', () => {
	it('should return an empty array if we have no data', () => {
		expect(transformASIFromIgesa()()).toEqual([]);
	});

	it('should return the right structure', () => {
		expect(transformASIFromIgesa()(ASI)).toEqual([
			{
				id: 'id ASI group',
				label: 'ASI group label',
				persons: [{ label: 'Sir', id: '1' }],
			},
		]);
	});
});
