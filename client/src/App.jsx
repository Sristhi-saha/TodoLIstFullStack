import { useState } from 'react'
import TodoList from './component/todolist/index.jsx'
import AddTodo from './component/addtodo/index.jsx'
import { Routes, Route } from 'react-router-dom'
import EditTodo from './component/editTodo/index.jsx'

function App() {
  return (
    <div className="min-h-screen">
      <div className="text-center flex justify-center items-center h-['200px'] w-full text-white text-3xl font-bold tracking-tight mb-6 bg-[url(https://img.freepik.com/premium-photo/tropical-palm-leaf-tropical-vine-sea_199527-414.jpg)]">
        <h1 className='font-mono tracking-wider text-5xl '>
          TO-DO APP
        </h1>
      </div>
      <div className="max-w-2xl mx-auto">
      <Routes>
        <Route path='/' element={<TodoList />} />
        <Route path='/add-todo' element={<AddTodo/>}/>
        <Route path='/edit-todo/:id' element={<EditTodo />}/>
      </Routes>
      {/* <div className="max-w-2xl mx-auto">
        <div className="p-6">
          <TodoList />
        </div>
      </div> */}
      </div>
    </div>
  )
}

export default App