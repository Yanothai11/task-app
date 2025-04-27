import express from 'express';
import cors from 'cors';

const app = express();
const port = 5001;

let tasks = [
  { id: 1, title: 'Task 1', description: 'Description 1' },
  { id: 2, title: 'Task 2', description: 'Description 2' },
];

app.use(express.json());
app.use(cors());

// เส้นทางนี้ใช้สำหรับดึงข้อมูลทั้งหมดของ tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// เส้นทางนี้ใช้สำหรับดึงข้อมูลของ task ตาม id

app.get('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const task = tasks.find(task => task.id === parseInt(id));
    
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  });

// เส้นทางสำหรับการสร้าง task ใหม่
app.post('/api/tasks', (req, res) => {
  const newTask = req.body;
  newTask.id = tasks.length + 1;
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// เส้นทางสำหรับการอัปเดต task
app.patch('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body;

  tasks = tasks.map((task) =>
    task.id === parseInt(id) ? { ...task, ...updatedTask } : task
  );

  res.json(updatedTask);
});

// เส้นทางสำหรับการลบ task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== parseInt(id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});