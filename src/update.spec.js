import React from 'react';
import { render } from '@testing-library/react';
import Update from './update';
import { Button, Select } from '@inseefr/wilco';
import { MemoryRouter } from 'react-router-dom';
const roles = [{ id: 'id', label: 'the role', persons: [] }];

jest.mock('./utils', () => {
	return {
		buildAgents: jest.fn().mockReturnValue([]),
	};
});

describe('administration-update-roles', () => {
	it('renders without crashing', () => {
		render(
			<MemoryRouter>
				<Update
					roles={roles}
					agents={[]}
					handleSave={() => console.log('save')}
				/>
			</MemoryRouter>
		);
	});

	it('should set the title with the first role', () => {
		const { container } = render(
			<MemoryRouter>
				<Update
					roles={roles}
					agents={[]}
					handleSave={() => console.log('save')}
				/>
			</MemoryRouter>
		);
		expect(container.querySelector('h3').innerHTML).toBe('the role');
	});

	it('should set the disabled property to true if there is nothing to add / delete', () => {
		const { container } = render(
			<MemoryRouter>
				<Update
					roles={roles}
					agents={[]}
					handleSave={() => console.log('save')}
				/>
			</MemoryRouter>
		);
		expect(container.querySelector('button[disabled]').innerHTML).toContain(
			'Save'
		);
	});
});
