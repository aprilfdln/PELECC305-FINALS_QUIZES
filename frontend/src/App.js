import React, { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  // ADD TASK
  const [showInput, setShowInput] = useState(false);
  const [newTask, setNewTask] = useState("");

  // EDIT TASK
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // FETCH TASKS
  const fetchTasks = async () => {

    const response = await fetch(
      "http://127.0.0.1:8000/api/tasks/"
    );

    const data = await response.json();

    setTasks(data);
  };

  // ADD TASK
  const addTask = async () => {

    if (newTask.trim() === "") return;

    await fetch(
      "http://127.0.0.1:8000/api/tasks/",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: newTask,
          is_completed: false,
        }),
      }
    );

    setNewTask("");
    setShowInput(false);

    fetchTasks();
  };

  // DELETE TASK
  const deleteTask = async (id) => {

    await fetch(
      `http://127.0.0.1:8000/api/tasks/${id}/`,
      {
        method: "DELETE",
      }
    );

    fetchTasks();
  };

  // START EDIT
  const startEdit = (task) => {

    setEditingId(task.id);

    setEditText(task.title);
  };

  // UPDATE TASK
  const updateTask = async (task) => {

    await fetch(
      `http://127.0.0.1:8000/api/tasks/${task.id}/`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: editText,
          is_completed: task.is_completed,
        }),
      }
    );

    setEditingId(null);
    setEditText("");

    fetchTasks();
  };

  // TOGGLE COMPLETE
  const toggleComplete = async (task) => {

    await fetch(
      `http://127.0.0.1:8000/api/tasks/${task.id}/`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: task.title,
          is_completed: !task.is_completed,
        }),
      }
    );

    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // SEARCH FILTER
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(
      search.toLowerCase()
    )
  );

  // PENDING TASKS
  const pendingTasks = filteredTasks.filter(
    (task) => !task.is_completed
  );

  // COMPLETED TASKS
  const completedTasks = filteredTasks.filter(
    (task) => task.is_completed
  );

  return (

    <div className="container">

      {/* HEADER */}
      <div className="top-bar">

        <h1>Tasks</h1>

        <button
          className="add-top-btn"
          onClick={() =>
            setShowInput(!showInput)
          }
        >
          +
        </button>

      </div>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search task..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="task-input"
      />

      {/* ADD TASK INPUT */}
      {showInput && (

        <div className="new-task-container">

          <input
            type="text"
            placeholder="Type new task..."
            value={newTask}
            onChange={(e) =>
              setNewTask(e.target.value)
            }
            className="task-input"
          />

          <button
            className="save-btn"
            onClick={addTask}
          >
            Save
          </button>

        </div>

      )}

      {/* TO BE COMPLETED */}
      <h2>To Be Completed</h2>

      {pendingTasks.map((task) => (

        <div key={task.id} className="task-card">

          {/* CHECKBOX */}
          <input
            type="checkbox"
            checked={task.is_completed}
            onChange={() =>
              toggleComplete(task)
            }
            className="circle-checkbox"
          />

          {/* EDIT MODE */}
          {editingId === task.id ? (

            <>
              <input
                type="text"
                value={editText}
                onChange={(e) =>
                  setEditText(e.target.value)
                }
                className="edit-input"
              />

              <button
                className="save-btn"
                onClick={() => updateTask(task)}
              >
                Save
              </button>
            </>

          ) : (

            <>
              <span>{task.title}</span>

              <button
                className="edit-btn"
                onClick={() => startEdit(task)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </>

          )}

        </div>

      ))}

      {/* COMPLETED
      <h2>Completed</h2>

      {completedTasks.map((task) => (

        <div key={task.id} className="task-card">

          <input
            type="checkbox"
            checked={task.is_completed}
            onChange={() =>
              toggleComplete(task)
            }
            className="circle-checkbox"
          />

          <span className="completed">
            {task.title}
          </span>

          <button
            className="delete-btn"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>

        </div>

      ))} */}

      {/* COMPLETED */}
      <h2>Completed</h2>

      {completedTasks.map((task) => (

        <div key={task.id} className="task-card">

          <input
            type="checkbox"
            checked={task.is_completed}
            onChange={() =>
              toggleComplete(task)
            }
            className="circle-checkbox"
          />

          <span className="completed">
            {task.title}
          </span>

          {/* PUSH DELETE BUTTON TO EDGE */}
          <div className="completed-actions">

            <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>
  );
}

export default App;




// import React, { useEffect, useState } from "react";
// import "./App.css";

// function App() {

//   const [tasks, setTasks] = useState([]);
//   const [search, setSearch] = useState("");

//   // ADD TASK
//   const [showInput, setShowInput] = useState(false);
//   const [newTask, setNewTask] = useState("");

//   // EDIT TASK
//   const [editingId, setEditingId] = useState(null);
//   const [editText, setEditText] = useState("");

//   // FETCH TASKS
//   const fetchTasks = async () => {

//     const response = await fetch(
//       "http://127.0.0.1:8000/api/tasks/"
//     );

//     const data = await response.json();

//     setTasks(data);
//   };

//   // ADD TASK
//   const addTask = async () => {

//     if (newTask.trim() === "") return;

//     await fetch(
//       "http://127.0.0.1:8000/api/tasks/",
//       {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify({
//           title: newTask,
//           is_completed: false,
//         }),
//       }
//     );

//     setNewTask("");
//     setShowInput(false);

//     fetchTasks();
//   };

//   // DELETE TASK
//   const deleteTask = async (id) => {

//     await fetch(
//       `http://127.0.0.1:8000/api/tasks/${id}/`,
//       {
//         method: "DELETE",
//       }
//     );

//     fetchTasks();
//   };

//   // START EDIT
//   const startEdit = (task) => {

//     setEditingId(task.id);

//     setEditText(task.title);
//   };

//   // UPDATE TASK
//   const updateTask = async (task) => {

//     await fetch(
//       `http://127.0.0.1:8000/api/tasks/${task.id}/`,
//       {
//         method: "PUT",

//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify({
//           title: editText,
//           is_completed: task.is_completed,
//         }),
//       }
//     );

//     setEditingId(null);
//     setEditText("");

//     fetchTasks();
//   };

//   // CHECK TASK
//   const toggleComplete = async (task) => {

//     await fetch(
//       `http://127.0.0.1:8000/api/tasks/${task.id}/`,
//       {
//         method: "PUT",

//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify({
//           title: task.title,
//           is_completed: !task.is_completed,
//         }),
//       }
//     );

//     fetchTasks();
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   // SEARCH
//   const filteredTasks = tasks.filter((task) =>
//     task.title.toLowerCase().includes(
//       search.toLowerCase()
//     )
//   );

//   const pendingTasks = filteredTasks.filter(
//     (task) => !task.is_completed
//   );

//   const completedTasks = filteredTasks.filter(
//     (task) => task.is_completed
//   );

//   return (

//     <div className="container">

//       {/* HEADER */}
//       <div className="top-bar">

//         <h1>Tasks</h1>

//         <button
//           className="add-top-btn"
//           onClick={() =>
//             setShowInput(!showInput)
//           }
//         >
//           +
//         </button>

//       </div>

//       {/* SEARCH */}
//       <input
//         type="text"
//         placeholder="Search task..."
//         value={search}
//         onChange={(e) =>
//           setSearch(e.target.value)
//         }
//         className="task-input"
//       />

//       {/* ADD TASK INPUT */}
//       {showInput && (

//         <div className="new-task-container">

//           <input
//             type="text"
//             placeholder="Type new task..."
//             value={newTask}
//             onChange={(e) =>
//               setNewTask(e.target.value)
//             }
//             className="task-input"
//           />

//           <button
//             className="save-btn"
//             onClick={addTask}
//           >
//             Save
//           </button>

//         </div>

//       )}

//       {/* TO DO */}
//       <h2>To Be Completed</h2>

//       {pendingTasks.map((task) => (

//         <div key={task.id} className="task-card">

//           {/* CIRCLE CHECKBOX */}
//           <input
//             type="checkbox"
//             checked={task.is_completed}
//             onChange={() =>
//               toggleComplete(task)
//             }
//             className="circle-checkbox"
//           />

//           {/* EDIT MODE */}
//           {editingId === task.id ? (

//             <>
//               <input
//                 type="text"
//                 value={editText}
//                 onChange={(e) =>
//                   setEditText(e.target.value)
//                 }
//                 className="edit-input"
//               />

//               <button
//                 className="save-btn"
//                 onClick={() => updateTask(task)}
//               >
//                 Save
//               </button>
//             </>

//           ) : (

//             <>
//               <span>{task.title}</span>

//               <button
//                 className="edit-btn"
//                 onClick={() => startEdit(task)}
//               >
//                 Edit
//               </button>

//               <button
//                 className="delete-btn"
//                 onClick={() => deleteTask(task.id)}
//               >
//                 Delete
//               </button>
//             </>

//           )}

//         </div>

//       ))}

//       {/* COMPLETED */}
//       <h2>Completed</h2>

//       {completedTasks.map((task) => (

//         <div key={task.id} className="task-card">

//           <input
//             type="checkbox"
//             checked={task.is_completed}
//             onChange={() =>
//               toggleComplete(task)
//             }
//             className="circle-checkbox"
//           />

//           <span className="completed">
//             {task.title}
//           </span>

//           <button
//             className="delete-btn"
//             onClick={() => deleteTask(task.id)}
//           >
//             Delete
//           </button>

//         </div>

//       ))}

//     </div>
//   );
// }

// export default App;
