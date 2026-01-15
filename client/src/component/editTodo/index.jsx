import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodoAsync, fetchTodos } from "../../store/slice/todoSlice.js";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTodo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const todos = useSelector(state => state.todolist.todos || []);
  const todoToEdit = todos.find(todo => todo._id === id);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Medium");

  // Load todo data when available
  useEffect(() => {
    if (!todoToEdit) {
      dispatch(fetchTodos());
      return;
    }
    setTitle(todoToEdit.title || "");
    setDate(todoToEdit.date ? todoToEdit.date.split("T")[0] : "");
    setCategory(todoToEdit.category || "");
    setPriority(todoToEdit.priority || "Medium");
  }, [todoToEdit, dispatch]);

  if (!id) return <p className="p-4">Invalid task ID.</p>;
  if (!todoToEdit) return <p className="p-4">Loading task data...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Please enter a task title");

    try {
      await dispatch(updateTodoAsync({
        id,
        updates: { title, date, category, priority }
      })).unwrap();

      navigate("/"); // back to task list
    } catch (error) {
      alert("Failed to update task: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-center">Edit Task</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
