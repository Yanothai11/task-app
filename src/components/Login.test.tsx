/// <reference types="vitest" />
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useFormik } from 'formik';
import { vi } from 'vitest';
import { useNavigate } from 'react-router-dom';

// Mock useNavigate hook
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// Mock useFormik hook
const mockFormik = {
  values: { email: '', password: '' },
  touched: { email: false, password: false },
  errors: { email: '', password: '' },
  handleChange: vi.fn(),
  handleBlur: vi.fn(),
  handleSubmit: vi.fn(),
};
vi.mock('formik', () => ({
  useFormik: () => mockFormik,
}));

import Login from './Login';

describe('Login Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    (mockFormik.handleChange as ReturnType<typeof vi.fn>).mockClear();
    (mockFormik.handleBlur as ReturnType<typeof vi.fn>).mockClear();
    (mockFormik.handleSubmit as ReturnType<typeof vi.fn>).mockClear();

    mockFormik.values = { email: '', password: '' };
    mockFormik.touched = { email: false, password: false };
    mockFormik.errors = { email: '', password: '' };
  });

  it('renders the login form elements', () => {
    render(<Login />);
    expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('calls handleSubmit on form submission', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /Login/i });
    fireEvent.click(submitButton);
    expect(mockFormik.handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('navigates to /dashboard on successful submit', async () => {
    (mockFormik.handleSubmit as ReturnType<typeof vi.fn>).mockImplementationOnce(() => {
      mockNavigate('/dashboard');
    });

    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /Login/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('shows email validation error when touched and invalid', async () => {
    mockFormik.touched.email = true;
    mockFormik.errors.email = 'Invalid email address';

    render(<Login />);
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText((text) => text.includes('Invalid email address'))).toBeInTheDocument();
    });
  });

  it('shows password validation error when touched and invalid', async () => {
    mockFormik.touched.password = true;
    mockFormik.errors.password = 'Password must be at least 6 characters';

    render(<Login />);
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText((text) => text.includes('Password must be at least 6 characters'))).toBeInTheDocument();
    });
  });

  it('calls handleBlur on input fields', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.blur(emailInput);
    expect(mockFormik.handleBlur).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ name: 'email' }),
      })
    );

    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.blur(passwordInput);
    expect(mockFormik.handleBlur).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ name: 'password' }),
      })
    );
  });
});