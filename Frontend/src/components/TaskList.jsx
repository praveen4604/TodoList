import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      if (!token) return nav("/login");
      
      try {
        const res = await fetch("http://localhost:5000/api/task/gp", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        
        if (data.success) {
          setTasks(data.tasks);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        alert("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, [nav]);

  const deleteTask = async (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    
    const token = localStorage.getItem("token");
    try {
      await fetch(`http://localhost:5000/api/task/${id}/gp`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(t => t._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  const toggleComplete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/task/${id}/toggle`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (data.success) {
        setTasks(tasks.map(task => 
          task._id === id ? { ...task, completed: !task.completed } : task
        ));
      }
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  if (loading) {
    return (
      <div className="task-list">
        <div className="text-center">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="task-list container">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Your Tasks</h2>
        <button 
          onClick={() => nav("/create")} 
          className="btn btn-primary"
        >
          + Add New Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="card text-center py-12">
          <h3 className="text-xl mb-4">No tasks found</h3>
          <button 
            onClick={() => nav("/create")} 
            className="btn btn-primary"
          >
            Create your first task
          </button>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map(task => (
            <div 
              key={task._id} 
              className={`task-card card priority-${task.priority.toLowerCase()}`}
            >
              <div className="flex justify-between items-start">
                <h3 className="task-title">{task.title}</h3>
                <span 
                  className={`completed-badge ${!task.completed && 'bg-gray-500'}`}
                  onClick={() => toggleComplete(task._id)}
                >
                  {task.completed ? "Completed" : "Pending"}
                </span>
              </div>
              <p className="task-description">{task.description}</p>
              
              <div className="task-meta">
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                <span className="capitalize">{task.priority}</span>
              </div>
              
              <div className="task-actions">
                <button 
                  onClick={() => nav(`/edit/${task._id}`)} 
                  className="btn btn-outline btn-sm"
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteTask(task._id)} 
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}