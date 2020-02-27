import React from 'react';
import Habilitation from '../src/home-container';
import { MemoryRouter } from 'react-router-dom';
import { boolean } from '@storybook/addon-knobs';

const loadAgentList = () =>
	Promise.resolve([
		{
			id: '5e281921920f0ea81cbee3b2',
			label: 'Whitaker Knapp',
		},
		{
			id: '5e28192123962f88ad7ab1a2',
			label: 'Yang Osborne',
		},
		{
			id: '5e2819216faa5304dbc3f64a',
			label: 'Karla Carson',
		},
	]);
const loadRoleList = () =>
	Promise.resolve([
		{
			persons: [
				{
					id: '5e2819217a606efe20f8aa44',
					label: 'Deleon Atkins',
					stamp: '1234',
				},
				{
					id: '5e28192123962f88ad7ab1a2',
					label: 'Yang Osborne',
				},
			],
			id: '1',
			label: 'admin',
		},
		{
			persons: [
				{
					id: '5e281921920f0ea81cbee3b2',
					label: 'Whitaker Knapp',
					stamp: '1234',
				},
				{
					id: '5e28192123962f88ad7ab1a2',
					label: 'Yang Osborne',
				},
				{
					id: '5e2819216faa5304dbc3f64a',
					label: 'Karla Carson',
				},
				{
					id: '5e281921e326a1a2a108193e',
					label: 'Casandra Wise',
				},
				{
					id: '5e2819217a606efe20f8aa44',
					label: 'Deleon Atkins',
				},
				{
					id: '5e281921a548739a0173c7bc',
					label: 'Rochelle Mcfarland',
				},
				{
					id: '5e2819211f270e9b3056f91b',
					label: 'Shanna Dudley',
				},
				{
					id: '5e281921f802894c347f6833',
					label: 'Milagros Ortega',
				},
				{
					id: '5e281921a0dbf7c07a87b02a',
					label: 'Schroeder Sykes',
				},
			],
			id: '2',
			label: 'user',
		},
	]);

export default {
	title: 'Component/Habilitation',
	component: Habilitation,
	includeStories: [],
};

export const basic = () => (
	<MemoryRouter>
		<Habilitation
			loadRoleList={loadRoleList}
			loadAgentList={loadAgentList}
			displayUpdateBtn={boolean('Display update button', true)}
		/>
	</MemoryRouter>
);

basic.story = {
	title: 'Default',
};

export const WithHandleBack = () => (
	<MemoryRouter>
		<Habilitation
			loadRoleList={loadRoleList}
			loadAgentList={loadAgentList}
			handleBack={() => alert('handleBack')}
			displayUpdateBtn={boolean('Display update button', true)}
		/>
	</MemoryRouter>
);

WithHandleBack.story = {
	title: 'WithHandleBack',
};