import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../store/slice/todoSlice";
export default function Overdue(){
    const dispatch = useDispatch();
    const { todos =[],loadinf,error} = useSelector(
        (state)=> state.todolist || {}
    );

    //fetch todos from backend when components mounted
    useEffect(()=>{
        dispatch(fetchTodos());
    },[dispatch]);

    useEffect(()=>{
        console.log('todos in todolist components'+todos)
    },[todos])



    return(
        <>
            <div className="">
                
            </div>
        </>
    )
}