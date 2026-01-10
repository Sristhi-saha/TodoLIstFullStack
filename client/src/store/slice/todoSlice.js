
//name , initial state , reducers 

import {createSlice} from "@reduxjs/toolkit"

export const todoSlice = createSlice({
    name : "todolist",
    initialState:{
        todos:[]
    },
    reducers : {
        addTodo : (state,action)=>{
            console.log("Action Payload:", action);
            const newTodo = {
                id: Date.now(),
                text: action.payload,
                completed: false
            };
            state.todos.push(newTodo);
        },
        removeTodo : (state,action)=>{
            state.todos = state.todos.filter((todo)=> todo.id !== action.payload);
        },
        updateTodo : (state,action)=>{

        }
    }
})


export const { addTodo , removeTodo , updateTodo } = todoSlice.actions;
export default todoSlice.reducer;