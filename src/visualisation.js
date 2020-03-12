import React, { useCallback, useState } from 'react';
import {
	Table,
	UpdateButton,
	ReturnButton,
	ActionToolbar,
	Button,
} from '@inseefr/wilco';
import D from './build-dictionary';
import RolesPicker from './roles-picker';

const VIEW = 'VIEW';
const EDIT = 'EDIT';

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
}) {
	const [mode, setMode] = useState(VIEW);
	const handleUpdate = useCallback(() => {
		setMode(mode === VIEW ? EDIT : VIEW);
	}, [mode]);
	let persons = agents.reduce(
		(acc, agent) => ({ ...acc, [agent.id]: { ...agent, roles: [] } }),
		{}
	);

	for (let i = 0; i < roles.length; i++) {
		roles[i].persons.forEach(p => {
			persons[p.id].roles.push(roles[i].label);
		});
	}

	const data = Object.values(persons)
		.filter(person => {
			return mode === EDIT || person.roles.length > 0;
		})
		.sort((p1, p2) => {
			return (
				p2.roles.length - p1.roles.length || p1.label.localeCompare(p2.label)
			);
		})
		.map(person => ({
			...person,
			roles:
				mode === VIEW ? (
					person.roles.join(',')
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
					<UpdateButton action={handleUpdate} />
				)}
				{mode === EDIT && displayUpdateBtn && (
					<Button action={handleUpdate}>{D.visualize}</Button>
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
