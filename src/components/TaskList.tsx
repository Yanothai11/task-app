import { useEffect, useState } from 'react';
import { fetchTasks, deleteTask, updateTask, addTask } from '../services/taskService';

type Task = {
  id: number;
  title: string;
  description: string;
};

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async () => {
    if (!title || !description) return;
    try {
      await addTask(title, description);
      setTitle('');
      setDescription('');
      loadTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบ Task นี้?')) return;
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = async (id: number) => {
    const newTitle = prompt('ใส่ชื่อใหม่ของ Task');
    const newDescription = prompt('ใส่รายละเอียดใหม่ของ Task');
    if (newTitle && newDescription) {
      try {
        await updateTask(id, newTitle, newDescription);
        loadTasks();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      <div className="mb-4 space-y-2">
        <input
          type="text"
          name="title"
          placeholder="ชื่องาน"
          className="border px-2 py-1 rounded w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="description"
          placeholder="รายละเอียด"
          className="border px-2 py-1 rounded w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={handleAddTask}>
          เพิ่ม
        </button>
      </div>

      {/* แสดงข้อความเมื่อไม่มีงาน */}
      {tasks.length === 0 ? (
        <div className="text-gray-500 text-center mt-4">ไม่พบงาน</div>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="bg-white p-4 rounded shadow">
              <div className="font-semibold">{task.title}</div>
              <div className="text-gray-600">{task.description}</div>
              <div className="mt-2 space-x-2">
                <button
                  className="bg-yellow-400 px-3 py-1 rounded"
                  onClick={() => handleEdit(task.id)}
                >
                  แก้ไข
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(task.id)}
                >
                  ลบ
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
