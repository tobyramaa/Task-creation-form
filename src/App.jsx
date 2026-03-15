import React, {useState} from "react";
import InputField from "./components/InputField";


const App = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!taskTitle.trim()) {
      alert("Task title cannot be empty")
      return;
    }

    const taskData = {
      title : taskTitle,
      createdAt: new Date().toISOString(),
    };

    console.log(JSON.stringify(taskData, null, 2));

    setSuccess("Task Created successfully");

    setTaskTitle("");

    setTimeout(() => {
      setSuccess("");
    }, 2000)

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-700">
      <div className="bg-slate-300 shadow-lg rounded-xl p-6 w-[400px]">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Task</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputField label="Task Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Enter task title"/>

          <button disabled={!taskTitle.trim()} className={`py-2 rounded-lg text-white font-medium transition
            ${
              taskTitle.trim()
              ? "bg-cyan-600 hover:bg-cyan-700"
              : "bg-gray-400 cursor-not-allowed"
            }`}>
              Create Task
            </button>
        </form>

        {success && (
          <p className="text-green-600 text-center mt-3">
            {success}
          </p>
        )}
      </div>
    </div>
  );
};
export default App