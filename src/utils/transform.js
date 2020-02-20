export const transformRoleFromIgesa = (array = []) =>
	array.length === 1
		? array[0].groupes.map(({ cn, description, personnes: persons }) => ({
				id: cn,
				label: description,
				persons: persons.map(({ cn: label, uid: id }) => ({ id, label })),
		  }))
		: [];

export const transformASIFromIgesa = (label = 'ASI group label') => (
	array = []
) => {
	if (array.length !== 1) return [];
	const { cn, personnes } = array[0];
	const persons = personnes.map(({ cn: label, uid: id }) => ({ id, label }));
	return [
		{
			id: cn,
			label,
			persons,
		},
	];
};
