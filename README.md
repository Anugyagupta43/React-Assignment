# InputField Component

A flexible and accessible React input component with comprehensive validation states, multiple variants, and theme support.

## Features

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

## Installation

```bash
npm install
npm start
```

## Usage

### Basic Example

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

### With Validation

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

### Different Variants

```tsx
{/* Outlined (default) */}
<InputField variant="outlined" label="Outlined Input" />

{/* Filled */}
<InputField variant="filled" label="Filled Input" />

{/* Ghost */}
<InputField variant="ghost" label="Ghost Input" />
```

### Different Sizes

```tsx
<InputField size="sm" label="Small Input" />
<InputField size="md" label="Medium Input" />
<InputField size="lg" label="Large Input" />
```

### With Theme Support

```tsx
<InputField
  label="Themed Input"
  theme="dark"
  placeholder="Dark theme input"
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

## Component Structure

```
InputField/
├── InputField.tsx      # Main component
├── InputField.css      # Styles
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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
