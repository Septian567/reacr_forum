import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PasswordInput from './PasswordInput';
import '@testing-library/jest-dom/vitest';

// Mock icons to avoid real SVG rendering
vi.mock('react-icons/fi', () => ({
  FiEye: () => <span>FiEye</span>,
  FiEyeOff: () => <span>FiEyeOff</span>,
}));

describe('PasswordInput component', () => {
  const defaultProps = {
    name: 'password',
    placeholder: 'Enter password',
    value: '',
    onChange: vi.fn(),
    showPassword: false,
    setShowPassword: vi.fn(),
    isFocused: false,
    setIsFocused: vi.fn(),
  };

  // Helper to render component with default + override props
  const setup = (overrideProps = {}) => {
    const props = { ...defaultProps, ...overrideProps };
    render(<PasswordInput {...props} />);
    return props;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly with default props', () => {
    setup();

    const input = screen.getByPlaceholderText('Enter password');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('name', 'password');
    expect(input).toHaveValue('');
  });

  it('should render input with type "password" when showPassword is false', () => {
    setup({ showPassword: false });

    const input = screen.getByPlaceholderText('Enter password');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('should render input with type "text" when showPassword is true', () => {
    setup({ showPassword: true });

    const input = screen.getByPlaceholderText('Enter password');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('should call onChange when the input value changes', () => {
    const props = setup();

    const input = screen.getByPlaceholderText('Enter password');
    fireEvent.change(input, { target: { value: 'mySecret123' } });

    expect(props.onChange).toHaveBeenCalledTimes(1);
  });

  it('should call setIsFocused(true) when input is focused', () => {
    const props = setup();

    const input = screen.getByPlaceholderText('Enter password');
    fireEvent.focus(input);

    expect(props.setIsFocused).toHaveBeenCalledWith(true);
  });

  it('should call setIsFocused(false) after input blur (with delay)', async () => {
    const props = setup();

    const input = screen.getByPlaceholderText('Enter password');
    fireEvent.blur(input);

    await waitFor(() => {
      expect(props.setIsFocused).toHaveBeenCalledWith(false);
    });
  });

  it('should show eye icon when isFocused is true', () => {
    setup({ isFocused: true });

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/FiEye/i)).toBeInTheDocument(); // icon mocked
  });

  it('should not show eye icon when isFocused is false', () => {
    setup({ isFocused: false });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByText(/FiEye/i)).not.toBeInTheDocument();
  });

  it('should toggle showPassword when eye icon is clicked', () => {
    const props = setup({ isFocused: true, showPassword: false });

    const toggleButton = screen.getByRole('button');
    fireEvent.mouseDown(toggleButton);

    expect(props.setShowPassword).toHaveBeenCalledTimes(1);
    expect(props.setShowPassword).toHaveBeenCalledWith(expect.any(Function));
  });
});
