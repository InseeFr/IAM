import React, { Fragment, Component } from 'react';
import { Loading } from '@inseefr/wilco';
import PropTypes from 'prop-types';
import Visualisation from './visualisation';
import Update from './update';
import { extractIdRole } from './utils/agents';

const initState = {
	deleteRequested: false,
	addRequested: false,
	update: false,
};

class Habilitation extends Component {
	state = { ...initState };
	addAgent = agents => {
		this.setState(() => ({
			addRequested: true,
		}));
		return extractIdRole(agents).map(a => this.props.addAgent(a));
	};

	deleteAgent = agents => {
		this.setState(() => ({
			deleteRequested: true,
		}));
		return agents.map(a => this.props.deleteAgent(a));
	};

	handleSave = data => {
		const { toAdd, toDelete } = data;

		let agentActions = [];
		if (toAdd.length !== 0)
			agentActions = [...agentActions, ...this.addAgent(toAdd)];
		if (toDelete.length !== 0)
			agentActions = [...agentActions, ...this.deleteAgent(toDelete)];
		Promise.all(agentActions).then(() => {
			this.loadRoleList().then(() =>
				this.setState({
					deleteRequested: false,
					addRequested: false,
					update: false,
				})
			);
		});
	};

	loadAgentList = () =>
		this.props.loadAgentList().then(agents =>
			this.setState(() => ({
				agents,
			}))
		);

	loadRoleList = () =>
		this.props.loadRoleList().then(roles =>
			this.setState(() => ({
				roles,
			}))
		);

	componentDidMount() {
		if (!this.state.roles) {
			this.loadRoleList();
		}
		if (!this.state.agents) {
			this.loadAgentList();
		}
	}

	handleUpdate = () => {
		this.setState({
			update: true,
		});
	};

	render() {
		const { addRequested, deleteRequested, roles, agents, update } = this.state;

		if (deleteRequested || addRequested) return <Loading textType="saving" />;

		if (roles && agents) {
			return (
				<Fragment>
					{update && (
						<Update
							roles={roles}
							agents={agents}
							handleSave={this.handleSave}
							handleBack={() => this.setState({ update: false })}
						/>
					)}
					{!update && (
						<Visualisation
							roles={roles}
							handleUpdate={this.handleUpdate}
							handleBack={this.props.handleBack}
						/>
					)}
				</Fragment>
			);
		}
		return <Loading />;
	}
}

Habilitation.propTypes = {
	loadAgentList: PropTypes.func.isRequired,
	loadRoleList: PropTypes.func.isRequired,
	deleteAgent: PropTypes.func.isRequired,
	addAgent: PropTypes.func.isRequired,
};

Habilitation.defaultProps = {
	loadAgentList: () => Promise.resolve(),
	loadRoleList: () => Promise.resolve(),
	deleteAgent: () => Promise.resolve(),
	addAgent: () => Promise.resolve(),
};
export default Habilitation;
