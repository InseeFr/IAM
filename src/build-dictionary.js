import {
	createDictionary,
	firstLang,
	secondLang,
	getLang,
} from '@inseefr/wilco';

const dictionary = {
	pickedRolePlaceholder: {
		fr: 'Sélectionner un rôle...',
		en: 'Select a role...',
	},
	nameTitle: {
		fr: 'Nom',
		en: 'Name',
	},
	stampTitle: {
		fr: 'Timbre',
		en: 'Unit',
	},
	roleTitle: {
		fr: 'Rôle',
		en: 'Role',
	},
};

export const D1 = createDictionary(firstLang, dictionary);
export const D2 = createDictionary(secondLang, dictionary);

export default getLang() === firstLang ? D1 : D2;
