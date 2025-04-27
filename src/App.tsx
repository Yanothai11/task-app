import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import TaskList from './components/TaskList';
import AddTask from './components/AddTaskForm';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

const App = () => (
  <Router>
    <Routes>
      {/* Redirect root to tasks */}
      <Route path="/" element={<Navigate to="/tasks" replace />} />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/tasks" element={<TaskList />} /> 
      <Route path="/add-task" element={<AddTask />} /> 
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Private Route Example */}
      <Route path="/private" element={<PrivateRoute element={<div>Private Content</div>} />} />
    </Routes>
  </Router>
);

export default App;
