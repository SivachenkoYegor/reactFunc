import React from 'react';
import {connect} from "react-redux";
import {markAllTasks} from "../../redux/actions";


class SchedulerFooter extends React.Component {

  render() {
    let defaultCheckType;
    if (this.props.taskList.length === 0) {
      defaultCheckType = false
    } else {
      defaultCheckType = !this.props.taskList.some(task => !task.done);
    }
    return (
      <footer className="footer">
        <div className="checkbox">
          <input checked={defaultCheckType ? "checked" : ""} onClick={() => {
            this.props.markAllTasks(!defaultCheckType)
          }} type="checkbox" id="checkbox"/>
          <label htmlFor="checkbox"><span>All tasks completed</span></label>
        </div>
      </footer>
    )
  }
}

export default connect(state => {
  return {taskList: state.schedulerReducer.taskList,}
}, {markAllTasks})(SchedulerFooter);
