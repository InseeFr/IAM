import React, { useState, useEffect, useCallback } from 'react';
import { Loading } from '@inseefr/wilco';
import PropTypes from 'prop-types';
import Visualisation, { VIEW, EDIT } from './visualisation';
import { extractIdRole } from './utils/agents';

const Habilitation = ({
	addAgent,
	deleteAgent,
	loadRoleList,
	loadAgentList,
	handleBack,
	displayUpdateBtn,
}) => {
	const [mode, setMode] = useState(VIEW);
	const [agents, setAgents] = useState([]);
	const [roles, setRoles] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleAddAgent = agents => {
		return extractIdRole(agents).map(a => addAgent(a));
	};

	const handleDeleteAgent = agents => {
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
				setMode(VIEW);
				setRoles(roles);
			});
		});
	};

	useEffect(() => {
		setLoading(true);
		loadRoleList().then(roles => {
			setRoles(roles);
			setLoading(false);
		});
	}, []);

	useEffect(() => {
		if (mode === EDIT && agents.length === 0) {
			setLoading(true);
			loadAgentList().then(agents => {
				setAgents(agents);
				setLoading(false);
			});
		}
	}, [mode]);

	const toggleMode = useCallback(() => {
		setMode(mode === VIEW ? EDIT : VIEW);
	}, [mode]);

	if (loading) return <Loading />;

	const agentsProps = mode === EDIT ? agents : [];

	return (
		<Visualisation
			roles={roles}
			handleBack={handleBack}
			displayUpdateBtn={displayUpdateBtn}
			agents={agentsProps}
			handleSave={handleSave}
			mode={mode}
			toggleMode={toggleMode}
		/>
	);
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
