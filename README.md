# React Component Library

A comprehensive React component library featuring flexible and accessible components with comprehensive validation states, multiple variants, and theme support.

## Components

### 1. InputField Component
A flexible input component with validation states, multiple variants, and theme support.

### 2. DataTable Component
A powerful data table component with sorting, row selection, pagination, and loading states.

## Features

### InputField Component
- ✅ **Text input** with label, placeholder, helper text, error message
- ✅ **Multiple states**: disabled, invalid, loading
- ✅ **Three variants**: filled, outlined, ghost
- ✅ **Three sizes**: small, medium, large
- ✅ **Optional features**: clear button, password toggle
- ✅ **Theme support**: light & dark themes
- ✅ **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- ✅ **Responsive design**: mobile-friendly with iOS zoom prevention
- ✅ **TypeScript support**: Full type safety
- ✅ **Customizable**: Extensive prop options for styling and behavior

### DataTable Component
- ✅ **Display tabular data** with customizable columns
- ✅ **Column sorting** with visual indicators
- ✅ **Row selection** (single/multiple) with select all functionality
- ✅ **Loading state** with spinner and custom text
- ✅ **Empty state** with customizable message and icon
- ✅ **Pagination** with navigation controls
- ✅ **Custom cell rendering** for complex data display
- ✅ **Theme support**: light & dark themes
- ✅ **Three sizes**: small, medium, large
- ✅ **Responsive design**: mobile-friendly with horizontal scroll
- ✅ **TypeScript support**: Full type safety with generics
- ✅ **Accessibility**: Keyboard navigation, ARIA labels, screen reader support

## Installation

```bash
npm install
npm start
```

## Usage

### InputField Component

#### Basic Example

```tsx
import { InputField } from './components/InputField';

function MyForm() {
  const [value, setValue] = useState('');

  return (
    <InputField
      label="Email Address"
      placeholder="Enter your email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      helperText="We'll never share your email"
    />
  );
}
```

#### With Validation

```tsx
<InputField
  label="Password"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  errorMessage="Password must be at least 6 characters"
  showPasswordToggle
  required
/>
```

#### Different Variants

```tsx
{/* Outlined (default) */}
<InputField variant="outlined" label="Outlined Input" />

{/* Filled */}
<InputField variant="filled" label="Filled Input" />

{/* Ghost */}
<InputField variant="ghost" label="Ghost Input" />
```

#### Different Sizes

```tsx
<InputField size="sm" label="Small Input" />
<InputField size="md" label="Medium Input" />
<InputField size="lg" label="Large Input" />
```

#### With Theme Support

```tsx
<InputField
  label="Themed Input"
  theme="dark"
  placeholder="Dark theme input"
/>
```

### DataTable Component

#### Basic Example

```tsx
import { DataTable, Column } from './components/DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  status: string;
}

const columns: Column<User>[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sortable: true,
  },
  {
    key: 'age',
    title: 'Age',
    dataIndex: 'age',
    sortable: true,
    align: 'center',
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    render: (value) => (
      <span className={`status-badge status-badge--${value.toLowerCase()}`}>
        {value}
      </span>
    ),
  },
];

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, status: 'Active' },
];

function UserTable() {
  return (
    <DataTable
      data={data}
      columns={columns}
      rowKey="id"
    />
  );
}
```

#### With Row Selection

```tsx
function UserTableWithSelection() {
  const [selectedRows, setSelectedRows] = useState<User[]>([]);

  return (
    <DataTable
      data={data}
      columns={columns}
      selectable
      onRowSelect={setSelectedRows}
      rowKey="id"
    />
  );
}
```

#### With Pagination

```tsx
function UserTableWithPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  return (
    <DataTable
      data={data}
      columns={columns}
      rowKey="id"
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: data.length,
        onChange: (page) => setCurrentPage(page),
      }}
    />
  );
}
```

#### Different Sizes

```tsx
<DataTable data={data} columns={columns} size="sm" />
<DataTable data={data} columns={columns} size="md" />
<DataTable data={data} columns={columns} size="lg" />
```

#### With Theme Support

```tsx
<DataTable
  data={data}
  columns={columns}
  theme="dark"
/>
```

## Props

### InputFieldProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | The input value |
| `onChange` | `(e: React.ChangeEvent<HTMLInputElement>) => void` | - | Change handler |
| `label` | `string` | - | Input label |
| `placeholder` | `string` | - | Placeholder text |
| `helperText` | `string` | - | Helper text below input |
| `errorMessage` | `string` | - | Error message (overrides helperText) |
| `disabled` | `boolean` | `false` | Disable the input |
| `invalid` | `boolean` | `false` | Show invalid state |
| `loading` | `boolean` | `false` | Show loading spinner |
| `variant` | `'filled' \| 'outlined' \| 'ghost'` | `'outlined'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `type` | `'text' \| 'password' \| 'email' \| 'number' \| 'tel' \| 'url'` | `'text'` | Input type |
| `clearable` | `boolean` | `false` | Show clear button |
| `showPasswordToggle` | `boolean` | `false` | Show password visibility toggle |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme variant |
| `className` | `string` | `''` | Additional CSS classes |
| `id` | `string` | - | Input ID |
| `name` | `string` | - | Input name |
| `required` | `boolean` | `false` | Mark as required |
| `autoComplete` | `string` | - | Autocomplete attribute |
| `maxLength` | `number` | - | Maximum length |
| `minLength` | `number` | - | Minimum length |
| `pattern` | `string` | - | Input pattern |

### DataTableProps<T>

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | - | Array of data objects |
| `columns` | `Column<T>[]` | - | Column configuration |
| `loading` | `boolean` | `false` | Show loading state |
| `selectable` | `boolean` | `false` | Enable row selection |
| `onRowSelect` | `(selectedRows: T[]) => void` | - | Row selection callback |
| `className` | `string` | `''` | Additional CSS classes |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Table size |
| `emptyText` | `string` | `'No data available'` | Empty state message |
| `loadingText` | `string` | `'Loading...'` | Loading state message |
| `rowKey` | `keyof T \| ((record: T, index: number) => string)` | - | Unique row identifier |
| `pagination` | `PaginationConfig` | - | Pagination configuration |

### Column<T>

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `key` | `string` | - | Unique column identifier |
| `title` | `string` | - | Column header text |
| `dataIndex` | `keyof T` | - | Data property to display |
| `sortable` | `boolean` | `false` | Enable column sorting |
| `width` | `string` | - | Column width |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment |
| `render` | `(value: any, record: T, index: number) => React.ReactNode` | - | Custom cell renderer |

## Component Structure

```
components/
├── InputField/
│   ├── InputField.tsx      # Main component
│   ├── InputField.css      # Styles
│   └── index.ts           # Exports
└── DataTable/
    ├── DataTable.tsx      # Main component
    ├── DataTable.css      # Styles
    └── index.ts           # Exports
```

## Styling

The component uses CSS classes for styling with BEM methodology:

- `.input-field-container` - Main container
- `.input-field` - Input element
- `.input-field__label` - Label
- `.input-field__wrapper` - Input wrapper
- `.input-field__message` - Helper/error message
- `.input-field__clear-button` - Clear button
- `.input-field__password-toggle` - Password toggle
- `.input-field__loading` - Loading spinner

### Modifiers

- `.input-field--{variant}` - Variant styles (filled, outlined, ghost)
- `.input-field--{size}` - Size styles (sm, md, lg)
- `.input-field--{theme}` - Theme styles (light, dark)
- `.input-field--disabled` - Disabled state
- `.input-field--invalid` - Invalid state
- `.input-field--focused` - Focused state
- `.input-field--loading` - Loading state

## Accessibility Features

- **ARIA labels**: Proper labeling for screen readers
- **Keyboard navigation**: Full keyboard support
- **Focus management**: Visible focus indicators
- **Screen reader support**: Proper semantic markup
- **High contrast mode**: Support for high contrast preferences
- **Reduced motion**: Respects user's motion preferences

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development

### Running the Demo

```bash
npm start
```

The demo will open at `http://localhost:3000` and showcase all component features.

### Building for Production

```bash
npm run build
```

### Testing

```bash
npm test
```

## Examples

### Form with Validation

```tsx
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        errorMessage={errors.name}
        required
      />
      
      <InputField
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        errorMessage={errors.email}
        required
      />
      
      <InputField
        label="Message"
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        variant="filled"
        size="lg"
      />
      
      <button type="submit">Send Message</button>
    </form>
  );
}
```

### Search Input with Clear Button

```tsx
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <InputField
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      clearable
      variant="ghost"
      size="lg"
    />
  );
}
```

### Password Input with Toggle

```tsx
function LoginForm() {
  const [password, setPassword] = useState('');

  return (
    <InputField
      label="Password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      showPasswordToggle
      required
    />
  );
}
```
## Preview
<img width="1917" height="838" alt="image" src="https://github.com/user-attachments/assets/6b450e1e-ab84-4991-b97c-d6f9e2b1243d" />

<img width="1899" height="780" alt="image" src="https://github.com/user-attachments/assets/44152e9e-39e0-45dc-85b8-5ae824d013ca" />


