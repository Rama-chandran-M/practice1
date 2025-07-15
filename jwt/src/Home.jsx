import React,{useState} from "react";
import axios from 'axios';
function Home(){
    const[taskName,setTaskName] = useState('');
    const[deadline,setDeadline] = useState('');
    const[priority,setPriority] = useState('Medium');
    const handleSubmit = (e)=>{
        e.preventDefault();
        const newTask = {taskName,deadline,priority}
        axios.post('http://localhost:5000/tasks/addTask',newTask)
            .then((response)=>{
                alert(`${taskName} added successfully!`)
                setTaskName('');
                setDeadline('');
                setPriority('Medium');
            })
            .catch((error)=>{
                console.log(error.response?.data?.message);
            })
    }
    return(
        <div>
            <h1>To Do List</h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Add Task</button>
            </form>
        </div>
    )
}
export default  Home