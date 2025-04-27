{/*import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import TaskList from './components/TaskList';
import AddTask from './components/AddTaskForm';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute'; 


const App = () => {
  return (
    <Router>
      <Routes>
        {/*<Route path="/" element={<Navigate to="/login" />} /> */}
{/*}      <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<TaskList />} /> 
        <Route path="/add-task" element={<AddTask />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App; */}

///for run auth_redirect.cy
{/*const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/tasks" element={
          <PrivateRoute>
            <TaskList />
          </PrivateRoute>
        } />
        
        <Route path="/add-task" element={
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
        } />
        
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;*/}


import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import TaskList from './components/TaskList';
import AddTask from './components/AddTaskForm';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect from root to tasks page */}
        <Route path="/" element={<Navigate to="/tasks" />} />
        
        {/* Login and other routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<TaskList />} /> 
        <Route path="/add-task" element={<AddTask />} /> 
        <Route path="/dashboard" element={<Dashboard />} />

        {/* PrivateRoute wrapping private content */}
        <Route
          path="/private"
          element={<PrivateRoute element={<div>Private Content</div>} />}
        />
      </Routes>
    </Router>
  );
};

export default App;

