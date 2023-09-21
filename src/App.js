import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";

const App = () => {
  const [taskNameInputValue, setTaskNameInputValue] = useState("");
  const [tasks, setTasks] = useState(
    
    () => JSON.parse(localStorage.getItem("tasks")) ,[]
  );
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");

  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskNameInputValue.trim() === "") {
      return; 
    }
    const newTask = { id: uuidv4(), task: taskNameInputValue };
    setTasks([...tasks, newTask]);
    setTaskNameInputValue(""); 
  };

  const handleEditTask = (taskId, currentTask) => {
    setEditingTaskId(taskId);
    setEditedTaskText(currentTask);
  };

  const handleSaveEditedTask = () => {
    if (editedTaskText.trim() === "") {
      return; 
    }

    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, task: editedTaskText } : task
    );

    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditedTaskText(""); 
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <h1>
        <span className="second-title">Todo List App</span>
      </h1>
      <form onSubmit={handleAddTask}>
        <input
          className="add-task"
          type="text"
          placeholder="Add new task ..."
          value={taskNameInputValue}
          onChange={(e) => setTaskNameInputValue(e.target.value)}
        />
        <button type="submit" className="add-button">
          Add
        </button>
      </form>




      <div className="todo">
        <ul>
<li>
{tasks.map((task) => (
          <div key={task.id} className="todo-item">
            <div className="todo-text">
              {editingTaskId === task.id ? (
                <input
                  className="add-task"
                  type="text"
                  value={editedTaskText}
                  onChange={(e) => setEditedTaskText(e.target.value)}
                />
              ) : (
                <>
               
                  {task.task}
                  
                </>
                
              )}
              
            </div>
            
            <div className="todo-actions">
              {editingTaskId === task.id ? (
                <button
                  className="submit-edits"
                  onClick={handleSaveEditedTask}
                >
                  Save
                </button>
              ) : (
                <>
                  <button
                    className="submit-edits"
                    onClick={() => handleEditTask(task.id, task.task)}
                  >
                    Edit
                  </button>
                  <button
                    className="submit-edits"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
          
        ))}
        

</li>
        </ul>
       
        
      </div>
      
    </div>
  );
};

export default App;
