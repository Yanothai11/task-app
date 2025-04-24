import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import TaskList from './components/TaskList';
import AddTask from './components/AddTaskForm';
import Dashboard from './pages/Dashboard';


const App = () => {
  return (
    <Router>
      <Routes>
        {/*<Route path="/" element={<Navigate to="/login" />} /> */}
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<TaskList />} /> {/* เพิ่มเส้นทาง /tasks สำหรับ TaskList */}
        <Route path="/add-task" element={<AddTask />} /> {/* เพิ่มหน้านี้ */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

