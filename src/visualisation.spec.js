import React from 'react';
import Visualisation from './visualisation';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

const roles = [
	{
		id: '1',
		label: 'label',
		persons: [
			{
				id: '2',
				label: 'plabel',
				stamp: 'pstamp',
			},
		],
	},
];

const persons = [
	{
		id: '2',
		label: 'plabel',
		stamp: 'pstamp',
	},
];

describe('administration-visualisation-roles', () => {
	it('renders without crashing', () => {
		render(<Visualisation roles={roles} agents={persons} />);
	});

	it('should display a Table with the right data prop', () => {
		const { container } = render(
			<Visualisation roles={roles} agents={persons} />
		);
		expect(container.querySelector('tbody td:nth-child(1)').innerHTML).toBe(
			'plabel'
		);
		expect(container.querySelector('tbody td:nth-child(2)').innerHTML).toBe(
			'pstamp'
		);
		expect(container.querySelector('tbody td:nth-child(3)').innerHTML).toBe(
			'label'
		);
	});

	it('should define an empty arry for roles when it is undefined', () => {
		const { container } = render(
			<Visualisation roles={roles} agents={persons} />
		);
		expect(container.querySelectorAll('tbody tr').length).toBe(1);
	});
});
