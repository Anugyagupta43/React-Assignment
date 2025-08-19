import React, { useState, forwardRef } from 'react';
import './InputField.css';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  clearable?: boolean;
  showPasswordToggle?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      value = '',
      onChange,
      label,
      placeholder,
      helperText,
      errorMessage,
      disabled = false,
      invalid = false,
      loading = false,
      variant = 'outlined',
      size = 'md',
      type = 'text',
      clearable = false,
      showPasswordToggle = false,
      theme = 'light',
      className = '',
      id,
      name,
      required = false,
      autoComplete,
      maxLength,
      minLength,
      pattern,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputType = type === 'password' && showPasswordToggle ? (showPassword ? 'text' : 'password') : type;
    const hasValue = value !== undefined && value !== '';
    const showClearButton = clearable && hasValue && !disabled;
    const showPasswordButton = type === 'password' && showPasswordToggle && !disabled;

    const handleClear = () => {
      if (onChange) {
        const event = {
          target: { value: '' }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    const handlePasswordToggle = () => {
      setShowPassword(!showPassword);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
    };

    const containerClasses = [
      'input-field-container',
      `input-field--${variant}`,
      `input-field--${size}`,
      `input-field--${theme}`,
      {
        'input-field--disabled': disabled,
        'input-field--invalid': invalid,
        'input-field--loading': loading,
        'input-field--focused': isFocused,
        'input-field--has-value': hasValue,
      },
      className
    ].filter(Boolean).join(' ');

    const inputClasses = [
      'input-field',
      `input-field--${variant}`,
      `input-field--${size}`,
      {
        'input-field--disabled': disabled,
        'input-field--invalid': invalid,
        'input-field--focused': isFocused,
      }
    ].filter(Boolean).join(' ');

    return (
      <div className={containerClasses}>
        {label && (
          <label 
            htmlFor={id} 
            className={`input-field__label ${required ? 'input-field__label--required' : ''}`}
          >
            {label}
          </label>
        )}
        
        <div className="input-field__wrapper">
          <input
            ref={ref}
            id={id}
            name={name}
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled || loading}
            required={required}
            autoComplete={autoComplete}
            maxLength={maxLength}
            minLength={minLength}
            pattern={pattern}
            className={inputClasses}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          
          {loading && (
            <div className="input-field__loading">
              <div className="input-field__spinner"></div>
            </div>
          )}
          
          {showClearButton && (
            <button
              type="button"
              className="input-field__clear-button"
              onClick={handleClear}
              aria-label="Clear input"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
          
          {showPasswordButton && (
            <button
              type="button"
              className="input-field__password-toggle"
              onClick={handlePasswordToggle}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              )}
            </button>
          )}
        </div>
        
        {(helperText || errorMessage) && (
          <div className={`input-field__message ${errorMessage ? 'input-field__message--error' : 'input-field__message--helper'}`}>
            {errorMessage || helperText}
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
