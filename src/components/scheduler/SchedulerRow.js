import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faStar as sStar, faTimes} from "@fortawesome/free-solid-svg-icons";
import {faStar as rStar} from "@fortawesome/free-regular-svg-icons";
import {connect} from "react-redux";
import {markImportantTask, markTask, removeTask, updateTaskTitle} from "../../redux/actions";
import {toast} from "react-toastify";

class SchedulerRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      inputValue: '',
      prevValue: ''
    };
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    this.textInput.current.focus();
  }

  removeI = (id) => {
    this.props.removeTask(id)
  };
  editTitle = (id) => {
    this.props.updateTaskTitle(id, this.state.inputValue);
    this.setState({edit: !this.state.edit})
  };

  componentDidMount() {
    this.setState({inputValue: this.props.task.title})
  }

  keyChecker = (e) => {
    if (e.keyCode === 27) {
      this.setState({
        inputValue: this.props.task.title,
        edit: !this.state.edit
      })
    }
    if (e.keyCode === 13) {
      if (this.state.inputValue) {
        if (this.state.inputValue.length < 50) {
          this.editTitle(this.props.task.id);
          this.setState({edit: !this.state.edit})
        } else {
          toast.warn("Too long text in text field");
        }
      } else {
        toast.warn("Empty task text field");
      }
    }
  };

  render() {
    return (
      <div className="task-list-item"
           style={{backgroundColor: this.props.task.done ? "rgba(31, 30, 29,0.2)" : "white"}}>
        <div className="item-checkbox">
          <input checked={this.props.task.done ? "checked" : ""} onClick={() => {
            this.props.markTask(this.props.task.id)
          }} type="checkbox" id={this.props.task.id}/>
          <label htmlFor={this.props.task.id}></label>
        </div>
        <div className="task-items-content">
          <input
            onKeyDown={(e) => {
              this.keyChecker(e);
            }}
            disabled={this.state.edit ? '' : 'disabled'}
            key={this.props.task.id}
            type="text"
            value={this.state.inputValue}
            ref={this.textInput}
            onChange={event => {
              this.setState({inputValue: event.target.value})
            }}
            style={{backgroundColor: this.props.task.done ? "rgba(31, 30, 29,0.1)" : "white"}}/>
        </div>
        <div className="task-items-actions">
          <a onClick={() => {
            this.props.markImportantTask(this.props.task.id);
          }}><FontAwesomeIcon icon={this.props.task.important ? sStar : rStar}/></a>
          <a onClick={async () => {
            await this.setState({edit: !this.state.edit});
            this.focusTextInput();
          }}><FontAwesomeIcon icon={faEdit}/></a>
          <a onClick={() => {
            this.removeI(this.props.task.id)
          }}><FontAwesomeIcon icon={faTimes}/></a>
        </div>
      </div>
    )
  }
}

export default connect(() => {
  return {}
}, {removeTask, markTask, updateTaskTitle, markImportantTask})(SchedulerRow);
