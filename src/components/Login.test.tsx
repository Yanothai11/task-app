/// <reference types="vitest" />
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { useNavigate } from 'react-router-dom';

import Login from './Login';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('Login Component (Full Coverage)', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the login form elements', () => {
    render(<Login />);
    expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('fills and submits form successfully', async () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('shows email validation error', async () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(/Required/i)).toBeInTheDocument();
    });
  });

  it('shows password validation error', async () => {
    render(<Login />);

    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText(/Required/i)).toBeInTheDocument();
    });
  });

  it('shows email format validation error', async () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/Email/i);
    await userEvent.type(emailInput, 'invalidemail');
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    });
  });

  it('shows password length validation error', async () => {
    render(<Login />);

    const passwordInput = screen.getByLabelText(/Password/i);
    await userEvent.type(passwordInput, '123');
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
    });
  });
});
