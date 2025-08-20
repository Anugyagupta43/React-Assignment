import type { Preview } from '@storybook/react-webpack5'
import '../src/index.css';
import '../src/App.css';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
			default: 'transparent',
			values: [
				{ name: 'Transparent', value: 'transparent' },
				{ name: 'Light', value: '#f8fafc' },
				{ name: 'Dark', value: '#0f172a' },
			],
		},
	},
};

export default preview;