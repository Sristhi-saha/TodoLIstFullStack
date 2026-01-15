import { Plus, Calendar, Tag, Clock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAsync } from '../../store/slice/todoSlice.js';
import { useState } from 'react';

function AddTodo() {
    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('Medium');

    const options = ['Low', 'Medium', 'High'];

    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.todolist);

    async function handleAddTodo(e) {
        e.preventDefault();

        if (!taskName.trim()) {
            alert('Please enter a task name');
            return;
        }

        const newTodo = {
            title: taskName,       // ✅ lowercase
            date: dueDate,         // ✅ lowercase
            category: category,
            priority: priority,
            completed: false
        };

        console.log(newTodo);

        try {
            // Dispatch async action to add todo to backend
            await dispatch(addTodoAsync(newTodo)).unwrap();
            console.log("Todo added successfully:", newTodo);

            // Reset form
            setTaskName('');
            setDueDate('');
            setCategory('');
            setPriority('Medium');

            // Navigate to todo list page
            window.location.href = '/';
        } catch (err) {
            console.error("Failed to add todo:", err);
            alert('Failed to add task. Please try again.');
        }
    }

    return (
        <div className="p-4">
            <div className="rounded-lg mt-4">
                <h1 className="text-5xl text-emerald-800 tracking-wider text-center font-sans font-semibold">Create New Task</h1>
                <p className="text-center pt-2">What would you like to accomplish today?</p>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
                    <p className="font-bold">Error:</p>
                    <p>{error}</p>
                </div>
            )}

            <div className="">
                <div className="bg-emerald-100 p-8 rounded-lg mt-6">
                    <form onSubmit={handleAddTodo}>
                        <div className="input">
                            <label className="tracking-wider text-sm pb-2 font-semibold text-gray-700 flex items-center gap-2">
                                <Tag className="w-4 h-4 text-emerald-600" />
                                Task Name
                            </label>
                            <input
                                type="text"
                                name='taskInput'
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                className='focus:ring-2 focus:ring-emerald-200 focus:outline-none p-2 border border-gray-700 p-3 rounded-md w-full'
                                placeholder="Enter Your Task...."
                                disabled={loading}
                            />
                        </div>
                        <div className="input pt-6 flex gap-10">
                            <div className="inside w-1/2">
                                <label className="tracking-wider text-sm pb-2 font-semibold text-gray-700 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-emerald-600" />
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    name='dateInput'
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className='focus:ring-2 focus:ring-emerald-200 focus:outline-none p-2 border border-gray-700 p-3 rounded-md w-full'
                                    disabled={loading}
                                />
                            </div>
                            <div className='inside w-1/2'>
                                <label className="tracking-wider text-sm pb-2 font-semibold text-gray-700 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-emerald-600" />
                                    Category
                                </label>
                                <input
                                    type="text"
                                    name='categoryInput'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className='focus:ring-2 focus:ring-emerald-200 focus:outline-none p-2 border border-gray-700 p-3 rounded-md w-full'
                                    placeholder='Work, Personal....'
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div className="priority mt-6">
                            <label className="tracking-wider text-sm pb-2 font-semibold text-gray-700 flex items-center gap-2">
                                <Tag className="w-4 h-4 text-emerald-600" />
                                Priority
                            </label>
                            <div className="flex flex-row gap-2">
                                {
                                    options.map((value) => (
                                        <li
                                            key={value}
                                            className={`w-1/3 list-none font-bold p-3 text-center rounded-xl cursor-pointer transition-colors
                                                ${priority === value
                                                    ? value === 'Low'
                                                        ? 'bg-red-600 text-white hover:bg-red-700'
                                                        : value === 'Medium'
                                                            ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                                            : 'bg-green-400 text-white hover:bg-green-300'
                                                    : 'bg-green-200 text-gray-700 hover:bg-green-200'
                                                }
                                                ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                                            `}
                                            onClick={() => !loading && setPriority(value)}
                                        >
                                            {value}
                                        </li>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="submit mt-6">
                            <button
                                type="submit"
                                className="w-full bg-emerald-800 p-4 text-white rounded-xl hover:bg-emerald-700 transition-colors text-2xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-6 h-6" />
                                        Add Task
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddTodo;