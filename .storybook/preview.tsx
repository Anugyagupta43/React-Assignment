import type { Preview } from '@storybook/react-webpack5'
import React from 'react';
import '../src/index.css';
import '../src/App.css';

export const globalTypes = {
	theme: {
		name: 'Theme',
		description: 'Global theme for components',
		defaultValue: 'light',
		toolbar: {
			icon: 'circlehollow',
			items: [
				{ value: 'light', title: 'Light' },
				{ value: 'dark', title: 'Dark' },
			],
			showName: true,
		},
	},
};

export const decorators = [
	(Story, context) => (
		<div 
			className={`app ${context.globals.theme}`} 
			style={{ 
				minHeight: '100vh', 
				padding: 20 
			}}
		>
			<div className="app-container">
				<Story />
			</div>
		</div>
	),
];

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
