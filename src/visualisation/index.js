import React, { useState, useEffect } from 'react';
import {
	Table,
	UpdateButton,
	ReturnButton,
	ActionToolbar,
	Button,
} from '@inseefr/wilco';
import D from '../build-dictionary';
import RolesPicker from '../roles-picker';
import './visualisation.scss';

export const VIEW = 'VIEW';
export const EDIT = 'EDIT';

const rowParams = [
	{
		dataField: 'label',
		text: D.nameTitle,
		width: '40%',
		sort: true,
	},
	{ dataField: 'stamp', text: D.stampTitle, width: '30%', sort: true },
	{ dataField: 'roles', text: D.roleTitle, width: '30%', sort: true },
];

function VisualisationTable({
	roles = [],
	agents = [],
	handleBack,
	displayUpdateBtn = true,
	handleSave,
	mode = VIEW,
	toggleMode,
}) {
	const [personsWithRoles, setPersonsWithRoles] = useState([]);
	const [personsWithoutRoles, setPersonsWithoutRoles] = useState([]);

	useEffect(() => {
		let personsWithRoles = {};
		for (let i = 0; i < roles.length; i++) {
			roles[i].persons.forEach(p => {
				if (personsWithRoles[p.id]) {
					personsWithRoles[p.id].roles.push(roles[i].label);
				} else {
					personsWithRoles[p.id] = { ...p, roles: [roles[i].label] };
				}
			});
		}

		setPersonsWithRoles([...Object.values(personsWithRoles).sort(sortPersons)]);
	}, [roles]);

	useEffect(() => {
		let personsWithoutRoles = {};

		for (let i = 0; i < agents.length; i++) {
			personsWithoutRoles[agents[i].id] = { ...agents[i], roles: [] };
		}

		setPersonsWithoutRoles([
			...Object.values(personsWithoutRoles).sort(sortPersons),
		]);
	}, [agents, personsWithRoles]);

	const persons = [
		...personsWithRoles,
		...personsWithoutRoles.filter(
			person => !personsWithRoles.find(p => p.id === person.id)
		),
	];

	const sortPersons = (p1, p2) => p1.label.localeCompare(p2.label);

	const data = persons.map(person => ({
		...person,
		roles:
			mode === VIEW ? (
				<ul>
					{person.roles.map((role, index) => (
						<li key={`${person.id}-${index}`}>{role}</li>
					))}
				</ul>
			) : (
				<RolesPicker
					roles={roles}
					person={person}
					handleSubmit={handleSave}
				></RolesPicker>
			),
	}));

	return (
		<div className="container">
			<ActionToolbar>
				{handleBack ? <ReturnButton action={() => handleBack()} /> : <div />}
				{mode === VIEW && displayUpdateBtn && (
					<UpdateButton action={toggleMode} />
				)}
				{mode === EDIT && displayUpdateBtn && (
					<Button action={toggleMode}>{D.visualize}</Button>
				)}
			</ActionToolbar>
			<Table
				rowParams={rowParams}
				data={data}
				search={true}
				pagination={true}
			/>
		</div>
	);
}

export default VisualisationTable;
