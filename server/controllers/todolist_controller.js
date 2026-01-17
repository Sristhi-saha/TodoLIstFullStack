const todo = require('../models/todolist.js');

const getAllTodos = async(req,res)=>{
    try{
        const allTodos = await todo.find({});
        res.json(allTodos);
    }catch(e){
        console.log(e);
    }
}

const addTodos = async(req,res)=>{
    try{
        const todoData = req.body;
        const newTodos = new todo(todoData);
        await newTodos.save();
        res.status(201).json({
            success:true,
            data:newTodos
        })
    }catch(e){
        console.log(e);
    }
}

const deleteTodos = async(req,res)=>{
    try{
        const todoId = req.params.id;
        console.log(todoId);
        const deletedTodo = await todo.findByIdAndDelete(todoId);
        if(!deletedTodo){
            return res.status(404).json({
                success:false,
                message:"Todo not found with this id"
            });
        }else{
            res.status(200).json({
                success:true,
                message:"Todo deleted successfully"
            })
        }
    }catch(e){
        console.log(e);
    }
}

const updateTodos = async(req,res)=>{
    try{
        const todoId = req.params.id;
        console.log(todoId);
        const todoData = req.body;
        const updateTodo = await todo.findByIdAndUpdate(todoId, todoData, { new: true });
        res.status(200).json({
            success:true,
            data:updateTodo
        })
        if(!updateTodo){
            return res.status(404).json({
                success:false,
                message:"Todo not found with this id"
            });
        }
    }catch(e){
        console.log(e)
    }
}

const completedTodo = async (req,res)=>{
    try{
        const id = req.params.id;
        console.log(id);

        const todoFind = await todo.findById(id);
        if(!todoFind){
            return res.status(400).json({
                success:false,  
                message:'Todo not found with this id!!'
            })
        }

        todoFind.completed= !todoFind.completed;
        await todoFind.save();

        res.status(200).json({
            success:true,
            message:'updated successfully',
            data:todoFind
        })

    }catch(e){
        console.log(e)
    }
}

module.exports = {
    getAllTodos,
    addTodos,
    deleteTodos,
    updateTodos,
    completedTodo
}