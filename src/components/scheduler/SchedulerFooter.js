import React from 'react';
import {connect} from "react-redux";
import {markAllTasks} from "../../redux/actions";


const SchedulerFooter = ( props ) => {
    let defaultCheckType;

    if (props.taskList.length === 0) {
      defaultCheckType = false
    } else {
      defaultCheckType = !props.taskList.some(task => !task.done);
    }

    return (
      <footer className="footer">
        <div className="checkbox">
          <input checked={defaultCheckType ? "checked" : ""} onClick={() => {
            props.markAllTasks(!defaultCheckType)
          }} type="checkbox" id="checkbox"/>
          <label htmlFor="checkbox"><span>All tasks completed</span></label>
        </div>
      </footer>
    )
};

export default connect(state => {
  return {taskList: state.schedulerReducer.taskList,}
}, {markAllTasks})(SchedulerFooter);
