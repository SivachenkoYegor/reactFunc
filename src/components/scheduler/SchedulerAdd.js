import React, {useState} from 'react';
import {connect} from "react-redux";
import {addTask} from "../../redux/actions";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const SchedulerAddTask = (props) => {
  const [newTask, setNewTask] = useState('');
  const addTaskToList = () => {
    if (newTask) {
      if (newTask.length < 50) {
        props.addTask(newTask);
      } else {
        toast.warn("Too long text in text field");
      }
    } else {
      toast.warn("Empty task text field");
    }
    setNewTask('')
  };

  return (
    <div className="new-tasks">
      <input
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            addTaskToList()
          }
        }}
        onChange={(event => setNewTask(event.target.value))}
        value={newTask}
        type="text"/>
      <button
        type="primary"
        onClick={() => {
          addTaskToList()
        }}>Add task
      </button>
    </div>
  )
};


export default connect(() => {
  return {}
}, {addTask})(SchedulerAddTask);
