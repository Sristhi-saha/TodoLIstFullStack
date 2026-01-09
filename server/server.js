const express = require('express');//express module import 
const cors = require('cors');//it is used to allow cross-origin requests
const mongoose = require('mongoose');//it is used to interact with MongoDB database
require('dotenv').config();//it is used to load environment variables from a .env file into process.env
const todoRoutes = require('./routes/index.js');//importing todo routes



const app = express();//create app
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;

app.use(cors());
app.use(express.json());

//run server
app.get('/',(req,res)=>{
    res.send('server is running');
})

//connect to mongodb
mongoose.connect(DB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

//importing routes
app.use('/api/todos', todoRoutes);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})