import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completedTodoAsync, fetchTodos } from "../../store/slice/todoSlice";
import NavigateOption from "../navigate";



 function Today() {
 const dispatch = useDispatch();
 const {todos=[],loading,error} = useSelector((state)=>state.todolist || {})
    console.log(todos,loading,error);

//fetch toods when component mount
useEffect(()=>{
    dispatch(fetchTodos());
},[]);

const handleAddTask = ()=>{
window.location.href='/add-todo'
}

const handleToggleComplete = (id)=>{
    dispatch(completedTodoAsync(id));
}

const handleEditTodo = (id)=>{
    console.log('editing todo with this id:',id);
    if(!id) return console.error('tod is not getting in this id...');
    window.location.href=`/edit-todo/${id}`;
}

const now = new Date().toISOString().split('T')[0];
console.log(now);

const todayTodo =  todos.filter(todo=>todo.date.split('T')[0]===now && todo.completed===false);
console.log(todayTodo);

    if( todayTodo.length===0){
        return (
        <div className="">
            <NavigateOption />
            <div className="w-full pl-10 pr-10 pt-4">
                <div className="flex justify-center items-center">
                    <div className="text-gray-600 text-lg">
                        No task is found....
                    </div>
                </div>
            </div>
        </div>
    );
    }

    if(error){
        return(
            <>
                <NavigateOption />
                <div className="w-full pl-10 pr-10 pt-4">
                    <div className="bg-red-100 border border-red-400 text-red-600">
                        <p className="font-bold">Error:</p>
                        <p>{error}</p>
                    </div>
                </div>
            </>
        )
    }

    return(
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

                {/* {loading && (
                    <div className="text-center text-gray-500 mb-4">
                        Updating...
                    </div>
                )} */}

                <div className="bg-white rounded-lg shadow p-3 m-4">
                    {todos.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No tasks yet. Add your first task!</p>
                    ) : (
                        <ul className="flex flex-col gap-3 sm:gap-4">
                            {todayTodo.map((todo) => (
                                <li
                                    key={todo._id}
                                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 py-3 px-2 rounded hover:bg-gray-100"
                                >
                                    <div className="flex items-center gap-2 flex-1">
                                        <input
                                            type="checkbox"
                                            checked={todo.completed}
                                            onChange={() => handleToggleComplete(todo._id)}
                                            className="w-5 h-5 cursor-pointer"
                                        />
                                        <span className={todo.completed ? "line-through text-gray-500" : "text-gray-800 text-base sm:text-lg"}>
                                            {todo.title}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 mt-2 sm:mt-0">
                                        {todo.date && (
                                            <span className="text-sm text-gray-400 whitespace-nowrap">
                                                {new Date(todo.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        )}
                                        <button
                                            onClick={() => handleDeleteTodo(todo._id)}
                                            className="text-red-500 hover:text-red-700 font-semibold px-3 py-1 rounded hover:bg-red-50 transition"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => handleEditTodo(todo._id)}
                                            className="text-black hover:text-green-300 font-semibold px-3 py-1 rounded hover:bg-red-50 transition"
                                        >
                                            Modify
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                    )}
                </div>
            </div>
        </>
    )
    
}

export default Today;