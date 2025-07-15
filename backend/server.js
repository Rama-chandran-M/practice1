const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/auth',authRoutes);
app.use('/tasks',taskRoutes);
app.listen(5000,()=>{
    console.log("Server is runnig in port 5000");
})