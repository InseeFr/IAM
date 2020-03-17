import * as init from './init';

export const loadAgentList = () => Promise.resolve(init.agents);

export const loadRoleList = roles => Promise.resolve(roles);
