import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { InputField, type InputFieldProps } from './index';

const meta: Meta<typeof InputField> = {
	title: 'Components/InputField',
	component: InputField,
	parameters: {
		docs: {
			description: {
				component: 'A flexible input component with validation states, variants, sizes, and theme support.'
			}
		}
	},
	argTypes: {
		onChange: { action: 'changed' },
		type: {
			control: { type: 'select' },
			options: ['text', 'password', 'email', 'number', 'tel', 'url']
		},
		variant: {
			control: { type: 'radio' },
			options: ['filled', 'outlined', 'ghost']
		},
		size: {
			control: { type: 'radio' },
			options: ['sm', 'md', 'lg']
		},
		theme: {
			control: { type: 'radio' },
			options: ['light', 'dark']
		}
	},
	args: {
		label: 'Label',
		placeholder: 'Type here...',
		variant: 'outlined',
		size: 'md',
		theme: 'light'
	}
};

export default meta;

type Story = StoryObj<typeof InputField>;

function Controlled(props: InputFieldProps) {
	const [value, setValue] = useState<string>(typeof props.value === 'string' ? props.value : '');
	return (
		<InputField
			{...props}
			value={value}
			onChange={(e) => {
				setValue(e.target.value);
				props.onChange?.(e);
			}}
		/>
	);
}

export const Basic: Story = {
	render: (args) => <Controlled {...args} />,
	args: {
		helperText: "We'll never share your info"
	}
};

export const Variants: Story = {
	render: (args) => (
		<div style={{ display: 'grid', gap: 16 }}>
			<Controlled {...args} variant="outlined" label="Outlined" />
			<Controlled {...args} variant="filled" label="Filled" />
			<Controlled {...args} variant="ghost" label="Ghost" />
		</div>
	)
};

export const Sizes: Story = {
	render: (args) => (
		<div style={{ display: 'grid', gap: 16 }}>
			<Controlled {...args} size="sm" label="Small" />
			<Controlled {...args} size="md" label="Medium" />
			<Controlled {...args} size="lg" label="Large" />
		</div>
	)
};

export const States: Story = {
	render: (args) => (
		<div style={{ display: 'grid', gap: 16 }}>
			<Controlled {...args} label="Disabled" disabled placeholder="Disabled input" />
			<Controlled {...args} label="Invalid" invalid errorMessage="This field is required" />
			<Controlled {...args} label="Loading" loading placeholder="Fetching..." />
		</div>
	)
};

export const Password: Story = {
	render: (args) => (
		<Controlled {...args} type="password" showPasswordToggle label="Password" placeholder="Enter password" />
	)
};

export const Clearable: Story = {
	render: (args) => (
		<Controlled {...args} clearable label="Search" placeholder="Type to search" />
	)
};
