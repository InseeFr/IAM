import React, { useState, useEffect } from 'react';
import { Loading } from '@inseefr/wilco';
import PropTypes from 'prop-types';
import Visualisation from './visualisation';
import Update from './update';
import { extractIdRole } from './utils/agents';

const Habilitation = ({
	addAgent,
	deleteAgent,
	loadRoleList,
	loadAgentList,
	handleBack,
	displayUpdateBtn,
}) => {
	const [agents, setAgents] = useState([]);
	const [roles, setRoles] = useState([]);
	const [deleteRequested, setDeleteRequested] = useState(false);
	const [addRequested, setAddRequested] = useState(false);
	const [update, setUpdate] = useState(false);

	const handleAddAgent = agents => {
		setAddRequested(true);
		return extractIdRole(agents).map(a => addAgent(a));
	};

	const handleDeleteAgent = agents => {
		setDeleteRequested(true);
		return agents.map(a => deleteAgent(a));
	};

	const handleSave = data => {
		const { toAdd, toDelete } = data;
		let agentActions = [];
		if (toAdd.length !== 0)
			agentActions = [...agentActions, ...handleAddAgent(toAdd)];
		if (toDelete.length !== 0)
			agentActions = [...agentActions, ...handleDeleteAgent(toDelete)];
		Promise.all(agentActions).then(() => {
			loadRoleList().then(roles => {
				setRoles(roles);
				setAddRequested(false);
				setDeleteRequested(false);
				setUpdate(false);
			});
		});
	};

	useEffect(() => {
		loadRoleList().then(roles => setRoles(roles));
		loadAgentList().then(agents => setAgents(agents));
	}, []);

	if (deleteRequested || addRequested) return <Loading textType="saving" />;

	if (roles && agents) {
		return (
			<>
				{update && (
					<Update
						roles={roles}
						agents={agents}
						handleSave={handleSave}
						handleBack={() => setUpdate(false)}
					/>
				)}
				{!update && (
					<Visualisation
						roles={roles}
						handleUpdate={() => setUpdate(true)}
						handleBack={handleBack}
						displayUpdateBtn={displayUpdateBtn}
					/>
				)}
			</>
		);
	}
	return <Loading />;
};

Habilitation.propTypes = {
	/**
	  Function returin a Promise. When this promise 
	  is resolved, will return the list of agents.
    */
	loadAgentList: PropTypes.func.isRequired,
	/**
	  Function returin a Promise. When this promise 
	  is resolved, will return the list of roles.
    */
	loadRoleList: PropTypes.func.isRequired,
	deleteAgent: PropTypes.func.isRequired,
	addAgent: PropTypes.func.isRequired,
	handleBack: PropTypes.func,
	displayUpdateBtn: PropTypes.bool,
};

Habilitation.defaultProps = {
	loadAgentList: () => Promise.resolve(),
	loadRoleList: () => Promise.resolve(),
	deleteAgent: () => Promise.resolve(),
	addAgent: () => Promise.resolve(),
	displayUpdateBtn: true,
};
export default Habilitation;
