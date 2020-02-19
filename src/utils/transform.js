export const transformRoleFromIgesa = (array = []) =>
	array.length === 1
		? array[0].groupes.map(({ cn, description, personnes: persons }) => ({
				id: cn,
				label: description,
				persons: persons.map(({ cn: label, uid: id }) => ({ id, label })),
		  }))
		: [];
