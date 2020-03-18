import React from 'react';
import Habilitation from '../src/home-container';
import { MemoryRouter } from 'react-router-dom';
import { boolean } from '@storybook/addon-knobs';
import { transformRoleFromIgesa } from '../src/utils/transform';
const loadAgentList = () => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve([
				{
					id: '5e2819217a606efe20f8aa44',
					label: 'Deleon Atkins',
				},
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
				{
					id: '5e28192123962f88ad7ab1a7',
					label: 'Aang Asborne',
				},
				{
					id: '11111111111111',
					label: 'Foo Bar',
				},
			]);
		}, 0);
	});
};

const loadRoleList = () =>
	new Promise(resolve =>
		setTimeout(() => {
			resolve(
				transformRoleFromIgesa([
					{
						cn: 'homere-gestion',
						description: 'Application de gestion pour Homere',
						groupes: [
							{
								uid: '1',
								cn: 'gestion_pole_homere-gestion',
								description: 'Groupe des gestionnaires aparteant au pôle',
								profils: [],
								personnes: [
									{
										uid: '11111111111111',
										cn: 'Foo Bar',
										ou: 'STAMP 1',
									},
								],
							},
							{
								uid: '2',
								cn: 'gestion_pole_homere-gestion2',
								description: 'Groupe des gestionnaires aparteant au pôle2',
								profils: [],
								personnes: [
									{
										uid: '11111111111111',
										cn: 'Foo Bar',
										ou: 'STAMP 1',
									},
									{
										uid: '5e28192123962f88ad7ab1a7',
										cn: 'Aang Asborne',
										ou: 'TEST',
									},
								],
							},
						],
						profils: [],
					},
				])
			);
		}, 2000)
	);

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
