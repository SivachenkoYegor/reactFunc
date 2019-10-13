import React from 'react';
import {connect} from "react-redux";
import {addTask} from "../../redux/actions";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


class SchedulerAddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTask: '',
    }
  }

  addTaskToList = () => {
    if (this.state.newTask) {
      if (this.state.newTask.length < 50) {
        this.props.addTask(this.state.newTask);
      } else {
        toast.warn("Too long text in text field");
      }
    } else {
      toast.warn("Empty task text field");
    }
    this.setState({newTask: ''})
  };

  render() {
    return (
      <div className="new-tasks">
        <input
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              this.addTaskToList()
            }
          }}
          onChange={(event => this.setState({newTask: event.target.value}))}
          value={this.state.newTask}
          type="text"/>
        <button
          type="primary"
          onClick={() => {
            this.addTaskToList()
          }}>Add task
        </button>
      </div>
    )
  }
}

export default connect(() => {
  return {}
}, {addTask})(SchedulerAddTask);
