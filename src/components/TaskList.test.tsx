import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import TaskList from './TaskList';
import { fetchTasks, deleteTask, updateTask, addTask } from '../services/taskService';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('../services/taskService');

describe('TaskList', () => {
  beforeEach(() => {
    vi.stubGlobal('confirm', vi.fn(() => true));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('should render tasks', async () => {
    const mockTasks = [
      { id: 1, title: 'Task 1', description: 'Description 1' },
      { id: 2, title: 'Task 2', description: 'Description 2' },
    ];
    (fetchTasks as unknown as jest.Mock).mockResolvedValue(mockTasks);

    render(<TaskList />);
    expect(await screen.findByText('Task 1')).toBeInTheDocument();
    expect(await screen.findByText('Task 2')).toBeInTheDocument();
  });

  it('should show "no tasks" message if task list is empty', async () => {
    (fetchTasks as unknown as jest.Mock).mockResolvedValue([]);
    render(<TaskList />);
    expect(await screen.findByText(/ไม่พบงาน/i)).toBeInTheDocument();
  });

  it('should call deleteTask', async () => {
    (fetchTasks as unknown as jest.Mock).mockResolvedValue([
      { id: 1, title: 'Task 1', description: 'Description 1' },
    ]);
    (deleteTask as unknown as jest.Mock).mockResolvedValue({});

    render(<TaskList />);
    await screen.findByText('Task 1');

    await act(async () => {
      fireEvent.click(screen.getByText('ลบ'));
    });

    await waitFor(() => {
      expect(deleteTask).toHaveBeenCalledWith(1);
    });
  });

  it('should not call deleteTask if confirm is false', async () => {
    vi.stubGlobal('confirm', vi.fn(() => false));
    (fetchTasks as unknown as jest.Mock).mockResolvedValue([
      { id: 1, title: 'Task 1', description: 'Description 1' },
    ]);

    render(<TaskList />);
    await screen.findByText('Task 1');

    await act(async () => {
      fireEvent.click(screen.getByText('ลบ'));
    });

    await waitFor(() => {
      expect(deleteTask).not.toHaveBeenCalled();
    });
  });

  it('should call updateTask with prompt values', async () => {
    (fetchTasks as unknown as jest.Mock).mockResolvedValue([
      { id: 1, title: 'Task 1', description: 'Description 1' },
    ]);
    (updateTask as unknown as jest.Mock).mockResolvedValue({});

    window.prompt = vi
      .fn()
      .mockReturnValueOnce('Updated Task')
      .mockReturnValueOnce('Updated Description');

    render(<TaskList />);
    await screen.findByText('Task 1');

    await act(async () => {
      fireEvent.click(screen.getByText('แก้ไข'));
    });

    await waitFor(() => {
      expect(updateTask).toHaveBeenCalledWith(1, 'Updated Task', 'Updated Description');
    });
  });

  it('should not call updateTask if prompt returns null', async () => {
    window.prompt = vi.fn().mockReturnValueOnce(null).mockReturnValueOnce(null);

    (fetchTasks as unknown as jest.Mock).mockResolvedValue([
      { id: 1, title: 'Task 1', description: 'Description 1' },
    ]);

    render(<TaskList />);
    await screen.findByText('Task 1');

    await act(async () => {
      fireEvent.click(screen.getByText('แก้ไข'));
    });

    await waitFor(() => {
      expect(updateTask).not.toHaveBeenCalled();
    });
  });

  it('should add a task when input is valid', async () => {
    (fetchTasks as unknown as jest.Mock)
      .mockResolvedValueOnce([]) // Initial fetch
      .mockResolvedValueOnce([
        { id: 1, title: 'New Task', description: 'New Description' },
      ]);
    (addTask as unknown as jest.Mock).mockResolvedValue({});

    render(<TaskList />);

    fireEvent.change(screen.getByPlaceholderText('ชื่องาน'), {
      target: { value: 'New Task' },
    });
    fireEvent.change(screen.getByPlaceholderText('รายละเอียด'), {
      target: { value: 'New Description' },
    });

    fireEvent.click(screen.getByText('เพิ่ม'));

    await waitFor(() => {
      expect(addTask).toHaveBeenCalledWith('New Task', 'New Description');
    });

    expect(await screen.findByText('New Task')).toBeInTheDocument();
  });

  it('should not add task if input is empty', async () => {
    (fetchTasks as unknown as jest.Mock).mockResolvedValue([]);

    render(<TaskList />);

    fireEvent.change(screen.getByPlaceholderText('ชื่องาน'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByPlaceholderText('รายละเอียด'), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByText('เพิ่ม'));

    await waitFor(() => {
      expect(addTask).not.toHaveBeenCalled();
    });
  });

  // จับ error ใน loadTasks
  it('should handle fetchTasks error', async () => {
    (fetchTasks as unknown as jest.Mock).mockRejectedValue(new Error('Fetch error'));
    render(<TaskList />);
    await waitFor(() => {
      expect(screen.getByText(/ไม่พบงาน/i)).toBeInTheDocument();
    });
  });

  // จับ error ใน addTask
  it('should handle addTask error', async () => {
    (fetchTasks as unknown as jest.Mock).mockResolvedValue([]);
    (addTask as unknown as jest.Mock).mockRejectedValue(new Error('Add error'));

    render(<TaskList />);

    fireEvent.change(screen.getByPlaceholderText('ชื่องาน'), {
      target: { value: 'Test Task' },
    });
    fireEvent.change(screen.getByPlaceholderText('รายละเอียด'), {
      target: { value: 'Test Description' },
    });

    fireEvent.click(screen.getByText('เพิ่ม'));

    await waitFor(() => {
      expect(addTask).toHaveBeenCalled();
    });
  });

  // จับ error ใน deleteTask
  it('should handle deleteTask error', async () => {
    (fetchTasks as unknown as jest.Mock).mockResolvedValue([
      { id: 1, title: 'Task 1', description: 'Description 1' },
    ]);
    (deleteTask as unknown as jest.Mock).mockRejectedValue(new Error('Delete error'));

    render(<TaskList />);
    await screen.findByText('Task 1');

    await act(async () => {
      fireEvent.click(screen.getByText('ลบ'));
    });

    await waitFor(() => {
      expect(deleteTask).toHaveBeenCalledWith(1);
    });
  });

  // จับ error ใน updateTask
  it('should handle updateTask error', async () => {
    (fetchTasks as unknown as jest.Mock).mockResolvedValue([
      { id: 1, title: 'Task 1', description: 'Description 1' },
    ]);
    (updateTask as unknown as jest.Mock).mockRejectedValue(new Error('Update error'));

    window.prompt = vi
      .fn()
      .mockReturnValueOnce('New Title')
      .mockReturnValueOnce('New Description');

    render(<TaskList />);
    await screen.findByText('Task 1');

    await act(async () => {
      fireEvent.click(screen.getByText('แก้ไข'));
    });

    await waitFor(() => {
      expect(updateTask).toHaveBeenCalledWith(1, 'New Title', 'New Description');
    });
  });
});