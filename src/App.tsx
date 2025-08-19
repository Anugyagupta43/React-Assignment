import React, { useState } from 'react';
import { InputField } from './components/InputField';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    website: '',
    description: '',
    age: '',
    search: ''
  });

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Form submitted successfully!');
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`app ${theme}`}>
      <div className="app-container">
        <header className="app-header">
          <h1>InputField Component Task 1</h1>
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </header>

        <main className="app-main">
          <section className="demo-section">
            <h2>Basic Examples</h2>
            <div className="demo-grid">
              <InputField
                label="Basic Input"
                placeholder="Enter your text here"
                value={formData.name}
                onChange={handleInputChange('name')}
                theme={theme}
              />
              
              <InputField
                label="With Helper Text"
                placeholder="Enter your email"
                helperText="We'll never share your email with anyone else"
                value={formData.email}
                onChange={handleInputChange('email')}
                theme={theme}
              />
              
              <InputField
                label="With Error"
                placeholder="Enter your password"
                errorMessage={errors.password}
                value={formData.password}
                onChange={handleInputChange('password')}
                type="password"
                showPasswordToggle
                theme={theme}
              />
              
              <InputField
                label="Disabled Input"
                placeholder="This input is disabled"
                disabled
                theme={theme}
              />
            </div>
          </section>

          <section className="demo-section">
            <h2>Variants</h2>
            <div className="demo-grid">
              <InputField
                label="Outlined (Default)"
                placeholder="Outlined variant"
                variant="outlined"
                theme={theme}
              />
              
              <InputField
                label="Filled"
                placeholder="Filled variant"
                variant="filled"
                theme={theme}
              />
              
              <InputField
                label="Ghost"
                placeholder="Ghost variant"
                variant="ghost"
                theme={theme}
              />
            </div>
          </section>

          <section className="demo-section">
            <h2>Sizes</h2>
            <div className="demo-grid">
              <InputField
                label="Small"
                placeholder="Small size"
                size="sm"
                theme={theme}
              />
              
              <InputField
                label="Medium (Default)"
                placeholder="Medium size"
                size="md"
                theme={theme}
              />
              
              <InputField
                label="Large"
                placeholder="Large size"
                size="lg"
                theme={theme}
              />
            </div>
          </section>

          <section className="demo-section">
            <h2>Special Features</h2>
            <div className="demo-grid">
              <InputField
                label="With Clear Button"
                placeholder="Type something to see clear button"
                clearable
                value={formData.search}
                onChange={handleInputChange('search')}
                theme={theme}
              />
              
              <InputField
                label="Password with Toggle"
                placeholder="Enter your password"
                type="password"
                showPasswordToggle
                theme={theme}
              />
              
              <InputField
                label="Loading State"
                placeholder="Loading input"
                loading
                theme={theme}
              />
              
              <InputField
                label="Required Field"
                placeholder="This field is required"
                required
                theme={theme}
              />
            </div>
          </section>

          <section className="demo-section">
            <h2>Input Types</h2>
            <div className="demo-grid">
              <InputField
                label="Email"
                placeholder="Enter your email"
                type="email"
                theme={theme}
              />
              
              <InputField
                label="Phone Number"
                placeholder="Enter your phone number"
                type="tel"
                theme={theme}
              />
              
              <InputField
                label="Website URL"
                placeholder="Enter website URL"
                type="url"
                theme={theme}
              />
              
              <InputField
                label="Age"
                placeholder="Enter your age"
                type="number"
                minLength={1}
                maxLength={3}
                theme={theme}
              />
            </div>
          </section>

          <section className="demo-section">
            <h2>Form</h2>
            <form onSubmit={handleSubmit} className="demo-form">
              <div className="form-row">
                <InputField
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  errorMessage={errors.name}
                  required
                  theme={theme}
                />
                
                <InputField
                  label="Email Address"
                  placeholder="Enter your email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  errorMessage={errors.email}
                  required
                  theme={theme}
                />
              </div>
              
              <div className="form-row">
                <InputField
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  errorMessage={errors.password}
                  showPasswordToggle
                  required
                  theme={theme}
                />
                
                <InputField
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  theme={theme}
                />
              </div>
              
              <div className="form-row">
                <InputField
                  label="Website"
                  placeholder="Enter your website URL"
                  type="url"
                  value={formData.website}
                  onChange={handleInputChange('website')}
                  theme={theme}
                />
                
                <InputField
                  label="Age"
                  placeholder="Enter your age"
                  type="number"
                  value={formData.age}
                  onChange={handleInputChange('age')}
                  minLength={1}
                  maxLength={3}
                  theme={theme}
                />
              </div>
              
              <InputField
                label="Description"
                placeholder="Tell us about yourself"
                value={formData.description}
                onChange={handleInputChange('description')}
                theme={theme}
              />
              
              <button type="submit" className="submit-button">
                Submit Form
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
