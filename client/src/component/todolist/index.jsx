import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTodo } from "../../store/slice/todoSlice.js"
import NavigateOption from "../navigate/index.jsx";


function TodoList() {
    const [currentTodo, setCurrentTodo] = useState("");

    console.log(currentTodo);
    const dispatch = useDispatch();
    const extractedTodos = useSelector(state => state.todo.todos);
    console.log("Extracted Todos from Store:", extractedTodos);

    function handleAddTodo() {
        dispatch(addTodo(currentTodo));
        setCurrentTodo("");

    }

    return (
        <>
            <NavigateOption />
            <div className="w-full pl-10 pr-10 pt-4">
                <div className="flex flex-row justify-between">
                    <button className=" text-black text-[28px] rounded transition-colors ">Tasks</button>
                    <button className="bg-emerald-900 w-[120px] p-2 text-white rounded transition-colors hover:bg-emerald-400" onClick={handleAddTodo}>Add Task</button>
                </div>
                <div className="">
                    <ul>
                        {extractedTodos.map((todo) => (
                            <li key={todo.id} className="flex justify-between items-center border-b border-gray-300 py-2">
                                <span className={todo.completed ? "line-through text-gray-500" : ""}>{todo.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default TodoList;