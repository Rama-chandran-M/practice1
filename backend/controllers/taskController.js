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
exports.getTasks = (req,res) => {
    db.query('SELECT * from tasks',(error,results)=>{
        if(error){
            console.log("Error at Task Controller ", error);
            return res.status(500).json({message:'Error from task Controller'});
        }
        res.json(results);
    })
}
exports.deleteTask = (req,res) =>{
    const taskid = req.params.id;
    db.query('DELETE from tasks where id=?',[taskid],(error,result)=>{
        if(error){
            console.log("Error at task Controller",error.message);
            return res.status(500).json({message:'error in deleting task'});
        }
        res.json({message:'Task Deleted'});
    })
}
exports.updateTask = (req,res) => {
    const {taskName,deadline,priority} = req.body;
    const taskid = req.params.id;
    db.query('UPDATE tasks SET taskname=? ,deadline=?, priority=? where id=? ',[taskName,deadline,priority,taskid],(err,result)=>{
        if(err){
            console.log('Error at Task Controller' , err.message);
            return res.status(500).json({message:'error in updateing task'});
        }
        res.json({message:'Task Updated Successfully'});
    })
}