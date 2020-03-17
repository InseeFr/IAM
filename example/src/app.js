import React, { useState } from 'react';
import { Habilitation } from '@inseefr/iam';
import * as API from './data/fake-api';
import { agents, roles as initRoles } from './data/init';

const App = () => {
	const [roles, setRoles] = useState(initRoles);

	const handleAdd = ({ id, role }) => {
		const newRoles = roles.reduce((acc, r) => {
			if (r.id !== role) return [...acc, r];
			const persons = [...r.persons, agents.find(a => a.id === id)];
			return [...acc, { ...r, persons }];
		}, []);
		setRoles(newRoles);
	};

	const handleDelete = ({ id, role }) => {
		const newRoles = roles.reduce((acc, r) => {
			if (r.id !== role) return [...acc, r];
			const persons = r.persons.reduce((accP, p) => {
				if (p.id !== id) return [...accP, p];
				return accP;
			}, []);
			return [...acc, { ...r, persons }];
		}, []);
		setRoles(newRoles);
	};

	return (
		<>
			<h1 className="centered">IAM example</h1>
			<Habilitation
				loadAgentList={API.loadAgentList}
				loadRoleList={() => API.loadRoleList(roles)}
				deleteAgent={a => handleDelete(a)}
				addAgent={a => handleAdd(a)}
			/>
		</>
	);
};

export default App;
