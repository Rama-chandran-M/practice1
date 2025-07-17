import React,{useState} from "react";
import axios from 'axios';
import { useEffect } from "react";
import './Home.css'
function Home(){
    const[taskName,setTaskName] = useState('');
    const[deadline,setDeadline] = useState('');
    const[priority,setPriority] = useState('Medium');
    const[tasks,setTasks] = useState([]);
    const[updateID,setUpdateId] = useState(null);
    const fetchtasks =()=>{
        axios.get('http://localhost:5000/tasks/getTasks')
            .then((response)=>{
                setTasks(response.data);
                console.log(response.data);
            })
            .catch((error)=>{
                console.log(error.message)
            })
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        const newTask = {taskName,deadline,priority}
        if(updateID===null){
            axios.post('http://localhost:5000/tasks/addTask',newTask)
                .then((response)=>{
                    alert(`${taskName} added Successfully!`);
                    fetchtasks();
                    resetForm();
                })
                .catch((error)=>{
                    console.log(error.response?.data?.message);
                })
        }else{
            axios.put(`http://localhost:5000/tasks/updateTask/${updateID}`,newTask)
                .then(()=>{
                    fetchtasks();
                    resetForm();
                })
                .catch((error)=>{
                    console.log(error.response?.data?.message);
                })
        }
    }
    const handleUpdate = (task) =>{
        setUpdateId(task.id);
        setTaskName(task.taskname);
        setDeadline(task.deadline.slice(0,10));
        setPriority(task.priority);
    }
    const handledelete = (id) =>{
        axios.delete(`http://localhost:5000/tasks/deleteTask/${id}`,newTask)
            .then(()=>{
                console.log('Task Deleted Successfully');
                fetchtasks();
            })
            .catch((error)=>{
                console.log("error in deleteing", error.message)
            })
    }
    const resetForm=()=>{
        setUpdateId(null);
        setDeadline('');
        setPriority("Medium");
        setTaskName('');
    }
    useEffect(()=>{
        fetchtasks();
    },[])
    return(
        <div>
            <h1>To Do List</h1>
            <form className="formclass" onSubmit={handleSubmit}>
                <p>Enter Task Name</p>
                <input
                    type="text"
                    required
                    value={taskName}
                    onChange={(e)=>setTaskName(e.target.value)}
                    placeholder="Type Task Name Here"
                    autoComplete="off"
                />
                <p>Select Deadline Date here</p>
                <input
                    type="date"
                    required
                    onChange={(e)=>setDeadline(e.target.value)}
                    value={deadline}
                />
                <p>Select the Priority of task here</p>
                <select value={priority} required onChange={(e)=>setPriority(e.target.value)}>
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                </select>
                <button type="submit">{updateID===null ? 'Add Task' : 'Update Task'}</button>
                <br></br>
                {
                    updateID!==null && (
                        <button type="button" onClick={()=>resetForm()}>Cancel Update</button>
                    )
                }
            </form>
            <h3>Tasks Created</h3>
            <ul>
                {tasks.map((task)=>(
                    <li key = {task.id}>
                        Task Name : <strong>{task.taskname}</strong>
                        <br></br>
                        Deadline : {task.deadline.slice(0,10)}
                        <br></br>
                        Priority : {task.priority}
                        <br></br>
                        <button onClick={()=>{handledelete(task.id)}}>Delete Task</button>
                        <button onClick={()=>handleUpdate(task)}>Update Task</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default  Home