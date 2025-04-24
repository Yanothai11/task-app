// src/components/AddTaskForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddTaskForm from './AddTaskForm';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('AddTaskForm', () => {
  const mockFetch = vi.fn();
  const mockAlert = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch);
    vi.stubGlobal('alert', mockAlert);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    mockFetch.mockReset();
    mockAlert.mockReset();
  });

  it('shows validation errors for empty fields', async () => {
    render(<AddTaskForm />);
    fireEvent.click(screen.getByText('Add Task'));

    expect(await screen.findByText('Title is required')).toBeInTheDocument();
    expect(await screen.findByText('Description is required')).toBeInTheDocument();
  });

  it('submits form when valid', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

    render(<AddTaskForm />);
    fireEvent.change(screen.getByPlaceholderText(/task title/i), {
      target: { value: 'Test Task' },
    });
    fireEvent.change(screen.getByPlaceholderText(/description/i), {
      target: { value: 'Test Description' },
    });
    fireEvent.click(screen.getByText('Add Task'));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/tasks', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Test Task', description: 'Test Description' }),
    }));

    expect(mockAlert).toHaveBeenCalledWith('Task added successfully!');
  });

  it('shows error alert when submission fails', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });

    render(<AddTaskForm />);
    fireEvent.change(screen.getByPlaceholderText(/task title/i), {
      target: { value: 'Fail Task' },
    });
    fireEvent.change(screen.getByPlaceholderText(/description/i), {
      target: { value: 'Fail Description' },
    });
    fireEvent.click(screen.getByText('Add Task'));

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Failed to add task');
    });
  });
});
