export const fetchTasks = async (): Promise<any[]> => {
    const response = await fetch('http://localhost:5001/api/tasks');
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  };
  
  export const addTask = async (title: string, description: string): Promise<void> => {
    const response = await fetch('http://localhost:5001/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    if (!response.ok) {
      throw new Error('Failed to add task');
    }
  };
  
  export const deleteTask = async (id: number): Promise<void> => {
    const response = await fetch(`http://localhost:5001/api/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  };
  
  export const updateTask = async (id: number, title: string, description: string): Promise<void> => {
    const response = await fetch(`http://localhost:5001/api/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
  };
  