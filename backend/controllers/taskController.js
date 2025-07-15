const db = require('../config/db');

exports.addTask = (req,res) => {
    const {taskName,deadline,priority} = req.body;
    db.query('INSERT INTO tasks (taskname , deadline , priority) values (?,?,?)',[taskName,deadline,priority],(error,result)=>{
        if(error){
            console.log('Error at taskController',error);
            return res.status(500).json({message:'Error from task Controller'});
        }
        res.json({message:'Task Added Successfully'});
    }) 
}