import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    title: "", 
    description: "", 
    priority: "Low", 
    dueDate: "" 
  });

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`http://localhost:5000/api/task/${id}/gp`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setForm({
            title: data.task.title,
            description: data.task.description,
            priority: data.task.priority,
            dueDate: data.task.dueDate.split('T')[0]
          });
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/task/${id}/gp`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        alert("Task updated successfully!");
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task");
    }
  };

  return (
    <div className="auth-container">
      <div className="card">
        <h2 className="auth-title">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              className="form-control"
              placeholder="Enter task title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              placeholder="Enter task description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Priority</label>
            <select
              className="form-control"
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
}