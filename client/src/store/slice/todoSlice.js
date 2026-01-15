
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
    createTodo, 
    fetchTodos as fetchTodosAPI, 
    deleteTodo as deleteTodoAPI, 
    updateTodo as updateTodoAPI 
} from "./api/todoapi";

// Async Thunks for API calls
export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchTodosAPI();
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addTodoAsync = createAsyncThunk(
    'todos/addTodo',
    async (todoObj, { rejectWithValue }) => {
        try {
            // todoObj should have: title, date, category, priority, completed
            const response = await createTodo(todoObj);
            return response; // response should be the saved todo
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodo',
    async (id, { rejectWithValue }) => {
        try {
            await deleteTodoAPI(id);
            return id; // Return id to remove from state
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateTodoAsync = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const updatedTodo = await updateTodoAPI(id, updates);
      return updatedTodo;
    } catch (error) {
      // error.response?.data or error.message depending on backend error format
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const todoSlice = createSlice({
    name: "todolist",
    initialState: {
        todos: [],
        loading: false,
        error: null
    },
    reducers: {
        // Keep these for local operations if needed
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Todos
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Add Todo
            .addCase(addTodoAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.todos.push(action.payload);
            })
            .addCase(addTodoAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Delete Todo
            .addCase(deleteTodoAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = state.todos.filter(todo => todo._id !== action.payload);
            })
            .addCase(deleteTodoAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Update Todo
            .addCase(updateTodoAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTodoAsync.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(updateTodoAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearError } = todoSlice.actions;
export default todoSlice.reducer;