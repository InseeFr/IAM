import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';

import 'bootstrap/dist/css/bootstrap.css';

import './styles.css';

import '@inseefr/wilco/dist/index.css';

addDecorator(withKnobs({ escapeHTML: false }));

const requireAll = requireContext => requireContext.keys().map(requireContext);

const loadStories = () =>
	requireAll(require.context('../src', true, /stories\.jsx?$/));

configure(loadStories, module);
