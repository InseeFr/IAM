export const extractIdRole = agents =>
	Array.isArray(agents)
		? agents.reduce((acc, { id, roles }) => {
				const subAcc = roles.reduce((_, role) => [..._, { id, role }], []);
				return [...acc, ...subAcc];
		  }, [])
		: [];
