import { Plus, Calendar, Tag, Clock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../../store/slice/todoSlice.js';
import { useState } from 'react';

function AddTodo() {
    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('Medium');
    
    const options = ['Low', 'Medium', 'High'];

    const dispatch = useDispatch();
    const extractedTodos = useSelector(state => state.todo.todos);
    console.log("Extracted Todos from Store:", extractedTodos);

    function handleAddTodo(e) {
        e.preventDefault(); // Prevent form submission reload
        
        if (!taskName.trim()) {
            alert('Please enter a task name');
            return;
        }

        const newTodo = {
            id: Date.now(),
            text: taskName,
            date: dueDate,
            category: category,
            priority: priority,
            completed: false
        };

        dispatch(addTodo(newTodo));
        console.log("Dispatched New Todo:", newTodo);
        
        // Reset form
        setTaskName('');
        setDueDate('');
        setCategory('');
        setPriority('Medium');
        
        // Navigate to todo list page instead
        window.location.href = '/';
    }

    return (
        <div className="p-4">
            <div className="rounded-lg mt-6">
                <h1 className="text-5xl text-emerald-800 tracking-wider text-center font-sans font-semibold">Create New Task</h1>
                <p className="text-center pt-2">What would you like to accomplish today?</p>
            </div>
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
                                                }`
                                            } 
                                            onClick={() => setPriority(value)}
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
                                className="w-full bg-emerald-800 p-4 text-white rounded-xl hover:bg-emerald-700 transition-colors text-2xl font-semibold flex items-center justify-center gap-2"
                            >
                                <Plus className="w-6 h-6" />
                                Add Task
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddTodo;