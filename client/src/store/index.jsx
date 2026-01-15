//global store where you store everything  related to state management


import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice/todoSlice.js";  

const store = configureStore({
    reducer : {
        todolist: todoReducer  // Match the slice name
    }
})

export default store