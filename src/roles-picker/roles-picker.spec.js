import React from 'react';
import RolesPicker from './';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
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
	{
		id: '2',
		label: 'labe 2',
		persons: [],
	},
];

const person = {
	id: '2',
	label: 'plabel',
	stamp: 'pstamp',
	roles: ['label'],
};

describe('roles picker', () => {
	afterEach(() => jest.clearAllMocks());

	it('should display lis element for each role', () => {
		const { container } = render(<RolesPicker roles={roles} person={person} />);
		expect(container.querySelectorAll('li')).toHaveLength(3);
	});

	it('should display checkboxes with the right state element for each role', () => {
		const { container } = render(<RolesPicker roles={roles} person={person} />);
		expect(
			container.querySelectorAll('li:first-child input:checked')
		).toHaveLength(1);
		expect(
			container.querySelectorAll('li:nth-child(2) input:checked')
		).toHaveLength(0);
	});

	it('shoud call the handleSubmit prop after clicking to the button', () => {
		const handleSubmit = jest.fn();
		const { container } = render(
			<RolesPicker roles={roles} person={person} handleSubmit={handleSubmit} />
		);
		fireEvent.click(container.querySelector('li button'));
		expect(handleSubmit).toHaveBeenCalledWith({
			toAdd: [],
			toDelete: [],
		});
	});

	it('shoud call the handleSubmit prop after clicking to the button with toAdd datas', () => {
		const handleSubmit = jest.fn();
		const { container } = render(
			<RolesPicker roles={roles} person={person} handleSubmit={handleSubmit} />
		);
		fireEvent.click(container.querySelector('li:nth-child(2) input'));
		fireEvent.click(container.querySelector('li button'));

		expect(handleSubmit).toHaveBeenCalledWith({
			toAdd: [
				{
					id: '2',
					roles: ['2'],
				},
			],
			toDelete: [],
		});
	});

	it('shoud call the handleSubmit prop after clicking to the button with toDelete datas', () => {
		const handleSubmit = jest.fn();
		const { container } = render(
			<RolesPicker roles={roles} person={person} handleSubmit={handleSubmit} />
		);
		fireEvent.click(container.querySelector('li:first-child input'));
		fireEvent.click(container.querySelector('li button'));

		expect(handleSubmit).toHaveBeenCalledWith({
			toAdd: [],
			toDelete: [
				{
					id: '2',
					role: '1',
				},
			],
		});
	});

	it('should close the dropdown after validing the form', () => {
		const handleSubmit = jest.fn();

		const { container } = render(
			<RolesPicker roles={roles} person={person} handleSubmit={handleSubmit} />
		);
		expect(container.querySelector('.open')).toBeDefined();
		fireEvent.click(container.querySelector('button'));

		expect(container.querySelector('.open')).toBeDefined();
		fireEvent.click(container.querySelector('li button'));
		expect(container.querySelector('.open')).toBeDefined();
	});
});
