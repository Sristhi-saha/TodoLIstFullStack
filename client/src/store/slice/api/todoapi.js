import axios from "axios";

const BASE_URL = "http://localhost:4000/api/todos";

export const fetchTodos = async () => {
  const response = await axios.get(`${BASE_URL}/alltodos`);
  console.log(response)
  return response.data; // ✅ array only
};

export const createTodo = async (todo) => {
  const response = await axios.post(`${BASE_URL}/todos-add`, todo);
  return response.data.todo; // ✅ single todo
};

export const deleteTodo = async (id) => {
  await axios.delete(`${BASE_URL}/todos-delete/${id}`);
  return id; // ✅ return id for reducer
};

export const updateTodo = async (id, updatedTodo) => {
  const response = await axios.put(`${BASE_URL}/todos-update/${id}`, updatedTodo);
  console.log(response);
  return response.data.data; // matches backend's `data` property
};

