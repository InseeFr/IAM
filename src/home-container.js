import React, { Fragment, Component } from 'react';
import { Loading } from '@inseefr/wilco';
import Visualisation from './visualisation';
import Update from './update';
import PropTypes from 'prop-types';

const initState = {
	deleteRequested: false,
	addRequested: false,
	update: false,
};

class Habilitation extends Component {
	state = { ...initState };
	addAgent = data => {
		this.setState(() => ({
			addRequested: true,
		}));
		this.props.addAgent(data);
	};

	deleteAgent = data => {
		this.setState(() => ({
			deleteRequested: true,
		}));
		this.props.deleteAgent(data);
	};

	handleSave = data => {
		const { toAdd, toDelete } = data;

		const agentActions = [];
		if (toAdd.length !== 0) agentActions.push(this.addAgent(toAdd));
		if (toDelete.length !== 0) agentActions.push(this.deleteAgent(toDelete));
		Promise.all(agentActions).then(() => {
			this.setState({
				deleteRequested: false,
				addRequested: false,
				update: false,
			});
			this.loadAgentList();
			this.loadAgentList();
		});
	};

	loadAgentList = () => {
		this.props.loadAgentList().then(agents =>
			this.setState(() => ({
				agents,
			}))
		);
	};

	loadRoleList = () => {
		this.props.loadRoleList().then(roles =>
			this.setState(() => ({
				roles,
			}))
		);
	};
	componentWillMount() {
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
