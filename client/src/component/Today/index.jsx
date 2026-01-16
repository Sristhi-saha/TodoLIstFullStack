import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../store/slice/todoSlice";
import NavigateOption from "../navigate";
export default function Today(){
    const dispatch = useDispatch();
    const { todos =[],loading,error} = useSelector(
        (state)=> state.todolist || {}
    );

    //fetch todos from backend when components mounted
    useEffect(()=>{
        dispatch(fetchTodos());
    },[dispatch]);

    useEffect(()=>{
        console.log('todos in todolist components',todos)
    },[todos])

    const today = new Date().toISOString().split('T')[0];
    console.log(today);

    const todayFetchedTodos = todos.filter(todo=>
        todo.date.split("T")[0]===today
    )

    console.log(todayFetchedTodos);


    
    return(
        <>
            <div className="">
                
            </div>
        </>
    )
}