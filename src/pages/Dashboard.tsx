import React from 'react';
import AddTaskForm from '../components/AddTaskForm';
import TaskList from '../components/TaskList';

const Dashboard = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <AddTaskForm />
      <div className="mt-8">
        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;
