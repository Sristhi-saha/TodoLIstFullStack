const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title:{
        type:String,
        required:[true,"Title is required"],
        trim:true,
        maxLength:[100,"Title cannot be more than 100 characters"]
    },
    date:{
        type:Date,
        required:[true,"Date is required"]
    },
    completed:{
        type:Boolean,
        default:false   
    },
})

module.exports = mongoose.model("TodoList",todoSchema);