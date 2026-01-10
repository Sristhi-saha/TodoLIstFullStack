import { useEffect } from "react"
import { useSelector } from "react-redux"
import NavigateOption from "../navigate/index.jsx";

function TodoList() {
    const todos = useSelector((state) => state.todo.todos || []);
    
    useEffect(() => {
        console.log("Todos in TodoList Component:", todos);
    }, [todos])

    const handleAddTask = () => {
        window.location.href = '/add-todo';
    }

    return (
        <>
            <NavigateOption />
            <div className="w-full pl-10 pr-10 pt-4">
                <div className="flex flex-row justify-between items-center mb-6">
                    <h1 className="text-black text-[28px] font-semibold">Tasks</h1>
                    <button 
                        className="bg-emerald-900 w-[120px] p-2 text-white rounded transition-colors hover:bg-emerald-400" 
                        onClick={handleAddTask}
                    >
                        Add Task
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    {todos.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No tasks yet. Add your first task!</p>
                    ) : (
                        <ul>
                            {todos.map((todo) => (
                                <li 
                                    key={todo.id} 
                                    className="flex justify-between items-center border-b border-gray-300 py-3 last:border-b-0"
                                >
                                    <span className={todo.completed ? "line-through text-gray-500" : "text-gray-800"}>
                                        {todo.text || todo.task}
                                    </span>
                                    {todo.date && (
                                        <span className="text-sm text-gray-400">{todo.date}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    )
}

export default TodoList;