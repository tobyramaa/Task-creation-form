import React, { useState, useEffect } from "react";
import InputField from "./components/InputField";
import { TrashIcon } from "@heroicons/react/24/solid";

const App = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [success, setSuccess] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getTasksFromStorage = () => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      setError("Failed to load tasks");
      return [];
    }
  };


  const saveTasksToStorage = (tasksArray) => {
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  };

  useEffect(() => {
    setLoading(true);
    setError("");

    const storedTasks = getTasksFromStorage();

    setTimeout(()  => {
    setTasks(storedTasks);
    setLoading(false);
    }, 500)
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return alert("Task title cannot be empty");

    setLoading(true);

    const newTask = {
      id: Date.now(), 
      title: taskTitle,
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      saveTasksToStorage(updatedTasks);

      setSuccess("Task Created successfully");
      setTaskTitle("");
      setLoading(false);

      setTimeout(() => setSuccess(""), 2000);
    },500)
  };

  const handleDelete = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
    saveTasksToStorage(filteredTasks);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-700">
      <div className="bg-slate-300 shadow-lg rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputField
            label="Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Enter task title"
          />

          <button
            disabled={!taskTitle.trim()}
            className={`py-2 rounded-lg text-white font-medium transition
              ${
                taskTitle.trim()
                  ? "bg-cyan-600 hover:bg-cyan-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            Create Task
          </button>
        </form>

     
        {!loading && success && (
          <p className="text-green-600 text-center mt-3">{success}</p>
        )}
        {!loading && error && (
          <p className="text-red-600 text-center mt-3">{error}</p>
        )}

        
        {loading && (
          <div className="flex justify-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
          </div>
        )}

     
        {!loading && tasks.length === 0 && (
          <p className="text-center mt-4 text-gray-600">No tasks yet</p>
        )}

        <div className="mt-4 space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-3 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <span className="font-medium">{task.title}</span>
                <p className="text-xs text-gray-500">
                  {new Date(task.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-600 hover:text-red-800"
                title="Delete Task"
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;