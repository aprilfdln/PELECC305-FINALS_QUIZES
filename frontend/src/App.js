import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const API_URL = "https://yames.pythonanywhere.com/api/tasks/";
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const fetchTasks = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (newTask.trim() === "") return;
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title: newTask,
        is_completed: false,
      }),
    });

    setNewTask("");
    setShowInput(false);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}${id}/`, {
      method: "DELETE",
    });

    fetchTasks();
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.title);
  };

  const updateTask = async (task) => {
    await fetch(`${API_URL}${task.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title: editText,
        is_completed: task.is_completed,
      }),
    });

    setEditingId(null);
    setEditText("");

    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await fetch(`${API_URL}${task.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title: task.title,
        is_completed: !task.is_completed,
      }),
    });

    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) =>task.title.toLowerCase().includes(search.toLowerCase()));
  const pendingTasks = filteredTasks.filter((task) => !task.is_completed);
  const completedTasks = filteredTasks.filter((task) => task.is_completed);

  return (
    <div className="container">
      <div className="top-bar">
        <h1>Tasks</h1>
        <button className="add-top-btn"onClick={() => setShowInput(!showInput)}>+</button>
      </div>

      <input type="text"placeholder="Search task..."value={search}onChange={(e) => setSearch(e.target.value)}className="task-input"/>
      {showInput && (
        <div className="new-task-container">
          <input type="text"placeholder="Type new task..."value={newTask}onChange={(e) => setNewTask(e.target.value)}className="task-input"/>
          <button className="save-btn" onClick={addTask}>Save</button>
        </div>
      )}

      <h2>To Be Completed</h2>
      {pendingTasks.map((task) => (
        <div key={task.id} className="task-card">
          <inputtype="checkbox"checked={task.is_completed}onChange={() => toggleComplete(task)}className="circle-checkbox"/>
          {editingId === task.id ? (
            <>
              <inputtype="text"value={editText}onChange={(e) => setEditText(e.target.value)}className="edit-input"/>
              <button className="save-btn"onClick={() => updateTask(task)}>Save</button>
            </>
          ) : (
            <>
              <span>{task.title}</span>
              <buttonclassName="edit-btn"onClick={() => startEdit(task)}>Edit</button>
              <button className="delete-btn"onClick={() => deleteTask(task.id)}>Delete</button>
            </>
          )}

        </div>
      ))}

      <h2>Completed</h2>
      {completedTasks.map((task) => (
        <div key={task.id} className="task-card">
          <input type="checkbox"checked={task.is_completed}onChange={() => toggleComplete(task)}className="circle-checkbox"/>
          <span className="completed">{task.title}</span>
          <div className="completed-actions">
            <button className="delete-btn"onClick={() => deleteTask(task.id)}>Delete</button>
          </div>

        </div>
      ))}

    </div>
  );
}

export default App;
