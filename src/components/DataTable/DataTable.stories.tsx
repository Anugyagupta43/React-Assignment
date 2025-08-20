import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { DataTable, type Column } from './index';

interface User {
	id: number;
	name: string;
	email: string;
	age: number;
	status: 'Active' | 'Inactive';
	department: string;
}

const sampleData: User[] = [
	{ id: 1, name: 'Ananya', email: 'ananya@example.com', age: 30, status: 'Active', department: 'Engineering' },
	{ id: 2, name: 'Pooja Maheshwar', email: 'pooja@example.com', age: 25, status: 'Active', department: 'Marketing' },
	{ id: 3, name: 'Karan Khatri', email: 'karan123@example.com', age: 35, status: 'Inactive', department: 'Sales' },
	{ id: 4, name: 'Rajesh Kumar', email: 'rajeshk12@example.com', age: 28, status: 'Active', department: 'HR' },
	{ id: 5, name: 'Neelam Singh', email: 'SinghNeelam24@example.com', age: 32, status: 'Active', department: 'Engineering' },
];

const columns: Column<User>[] = [
	{ key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
	{ key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
	{ key: 'age', title: 'Age', dataIndex: 'age', sortable: true, align: 'center' },
	{ key: 'department', title: 'Department', dataIndex: 'department', sortable: true },
	{ key: 'status', title: 'Status', dataIndex: 'status', sortable: true },
];

// Wrap generic DataTable with a concrete typed component for Storybook typing
function DataTableUser(props: React.ComponentProps<typeof DataTable<User>>) {
	return <DataTable<User> {...props} />;
}

const meta: Meta<typeof DataTableUser> = {
	title: 'Components/DataTable',
	component: DataTableUser,
	parameters: {
		docs: {
			description: {
				component: 'Data table with sorting, row selection, loading and empty states.'
			}
		}
	},
	args: {
		data: sampleData,
		columns,
		selectable: false,
		loading: false,
		theme: 'light',
		size: 'md',
		emptyText: 'No data available',
		loadingText: 'Loading...'
	}
};

export default meta;

type Story = StoryObj<typeof DataTableUser>;

export const Basic: Story = {
	render: (args) => <DataTableUser {...args} rowKey="id" />,
};

export const WithSelection: Story = {
	render: (args) => {
		const [selected, setSelected] = useState<User[]>([]);
		return (
			<div style={{ display: 'grid', gap: 8 }}>
				<DataTableUser
					{...args}
					rowKey="id"
					selectable
					onRowSelect={setSelected}
				/>
				<div style={{ fontSize: 12, color: '#64748b' }}>
					Selected: {selected.length}
				</div>
			</div>
		);
	}
};

export const Sizes: Story = {
	render: (args) => (
		<div style={{ display: 'grid', gap: 24 }}>
			<DataTableUser {...args} rowKey="id" size="sm" />
			<DataTableUser {...args} rowKey="id" size="md" />
			<DataTableUser {...args} rowKey="id" size="lg" />
		</div>
	)
};

export const Loading: Story = {
	args: {
		loading: true
	},
	render: (args) => <DataTableUser {...args} rowKey="id" />,
};

export const Empty: Story = {
	args: {
		data: []
	},
	render: (args) => <DataTableUser {...args} rowKey="id" />,
};
