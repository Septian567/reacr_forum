import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import '@testing-library/jest-dom/vitest';

// Mock react-icons
vi.mock('react-icons/fi', () => ({
  FiEye: () => <span>FiEye</span>,
  FiEyeOff: () => <span>FiEyeOff</span>,
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LoginForm Component', () => {
  const getProps = (overrides = {}) => ({
    email: '',
    setEmail: vi.fn(),
    password: '',
    setPassword: vi.fn(),
    showPassword: false,
    setShowPassword: vi.fn(),
    isPasswordFocused: false,
    setIsPasswordFocused: vi.fn(),
    handleSubmit: vi.fn((e) => e.preventDefault()),
    status: 'idle',
    error: null,
    ...overrides,
  });

  const setup = (customProps = {}) => {
    const props = getProps(customProps);
    render(
      <MemoryRouter>
        <LoginForm {...props} />
      </MemoryRouter>
    );
    return props;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with initial props', () => {
    setup();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByText('Belum punya akun?')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Register' })
    ).toBeInTheDocument();
  });

  it('should call setEmail when email input changes', () => {
    const props = setup();
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    expect(props.setEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('should call setPassword when password input changes', () => {
    const props = setup();
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'mypassword' },
    });
    expect(props.setPassword).toHaveBeenCalledWith('mypassword');
  });

  it('should toggle password visibility when eye icon is clicked', () => {
    const props = setup({
      isPasswordFocused: true,
      showPassword: false,
    });

    fireEvent.mouseDown(screen.getByRole('button', { name: /FiEye/i }));
    expect(props.setShowPassword).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should show error message when status is failed', () => {
    setup({
      status: 'failed',
      error: '401 Unauthorized',
    });

    expect(screen.getByText('Email atau password salah')).toBeInTheDocument();
  });

  it('should show raw error message for non-401 errors', () => {
    setup({
      status: 'failed',
      error: '500 Internal Server Error',
    });

    expect(screen.getByText('500 Internal Server Error')).toBeInTheDocument();
  });

  it('should disable login button when status is loading', () => {
    setup({ status: 'loading' });

    const loginButton = screen.getByRole('button', {
      name: /Logging in\.\.\./i,
    });

    expect(loginButton).toBeDisabled();
  });

  it('should navigate to register page when register button is clicked', () => {
    setup();

    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });

  it('should call handleSubmit when form is submitted', () => {
    const props = setup();
    const form = screen.getByTestId('login-form');

    fireEvent.submit(form);

    expect(props.handleSubmit).toHaveBeenCalledTimes(1);
  });
});
