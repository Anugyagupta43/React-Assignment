import React, { useState } from 'react';
import { InputField } from './components/InputField';
import { DataTable, Column } from './components/DataTable';
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

  // DataTable sample data
  const sampleData = [
    { id: 1, name: 'Ananya', email: 'ananya@example.com', age: 30, status: 'Active', department: 'Engineering' },
    { id: 2, name: 'Pooja Maheshwar', email: 'pooja@example.com', age: 25, status: 'Active', department: 'Marketing' },
    { id: 3, name: 'Karan Khatri', email: 'karan123@example.com', age: 35, status: 'Inactive', department: 'Sales' },
    { id: 4, name: 'Rajesh Kumar', email: 'rajeshk12@example.com', age: 28, status: 'Active', department: 'HR' },
    { id: 5, name: 'Neelam Singh', email: 'SinghNeelam24@example.com', age: 32, status: 'Active', department: 'Engineering' },
  ];

  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

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

  // DataTable columns configuration
  const columns: Column<typeof sampleData[0]>[] = [
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
      key: 'department',
      title: 'Department',
      dataIndex: 'department',
      sortable: true,
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      sortable: true,
      render: (value) => (
        <span className={`status-badge status-badge--${value.toLowerCase()}`}>
          {value}
        </span>
      ),
    },
  ];

  return (
    <div className={`app ${theme}`}>
      <div className="app-container">
        <header className="app-header">
          <h1>Component Library Demo</h1>
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

          <section className="demo-section">
            <h2>DataTable Component</h2>
            
            <div className="demo-subsection">
              <h3>Basic DataTable</h3>
              <DataTable
                data={sampleData}
                columns={columns}
                theme={theme}
                rowKey="id"
              />
            </div>

            <div className="demo-subsection">
              <h3>DataTable with Row Selection</h3>
              <DataTable
                data={sampleData}
                columns={columns}
                selectable
                onRowSelect={setSelectedRows}
                theme={theme}
                rowKey="id"
              />
              {selectedRows.length > 0 && (
                <div className="selection-info">
                  Selected {selectedRows.length} row(s)
                </div>
              )}
            </div>

            <div className="demo-subsection">
              <h3>DataTable with Pagination</h3>
              <DataTable
                data={sampleData}
                columns={columns}
                theme={theme}
                rowKey="id"
                pagination={{
                  current: currentPage,
                  pageSize: pageSize,
                  total: sampleData.length,
                  onChange: (page) => setCurrentPage(page),
                }}
              />
            </div>

            <div className="demo-subsection">
              <h3>DataTable Sizes</h3>
              <div className="size-demo">
                <div>
                  <h4>Small</h4>
                  <DataTable
                    data={sampleData.slice(0, 3)}
                    columns={columns}
                    size="sm"
                    theme={theme}
                    rowKey="id"
                  />
                </div>
                <div>
                  <h4>Large</h4>
                  <DataTable
                    data={sampleData.slice(0, 3)}
                    columns={columns}
                    size="lg"
                    theme={theme}
                    rowKey="id"
                  />
                </div>
              </div>
            </div>

            <div className="demo-subsection">
              <h3>Empty State</h3>
              <DataTable
                data={[]}
                columns={columns}
                theme={theme}
                emptyText="No employees found"
              />
            </div>

            <div className="demo-subsection">
              <h3>Loading State</h3>
              <DataTable
                data={sampleData}
                columns={columns}
                loading
                theme={theme}
                loadingText="Loading employees..."
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
