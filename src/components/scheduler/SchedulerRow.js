import React, {useState, useEffect, useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faStar as sStar, faTimes} from "@fortawesome/free-solid-svg-icons";
import {faStar as rStar} from "@fortawesome/free-regular-svg-icons";
import {connect} from "react-redux";
import {markImportantTask, markTask, removeTask, updateTaskTitle} from "../../redux/actions";
import {toast} from "react-toastify";

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()};

  return [ htmlElRef, setFocus ]
};

const SchedulerRow = (props) => {
  const [inputActive, setActive] = useState(false);
  const [inputValue, setValue] = useState('');
  const [inputRef, setFocus] = useFocus();

  const focusTextInput = () => {
    setFocus();
  };

  const removeI = (id) => {
    props.removeTask(id)
  };

  const editTitle = (id) => {
    props.updateTaskTitle(id, inputValue);
    setActive(!inputActive)
  };

  useEffect(() => {
    setValue(props.task.title)
  }, []);

  const keyChecker = (e) => {
    if (e.keyCode === 27) {
      setValue(props.task.title);
      setActive(!inputActive);
    }
    if (e.keyCode === 13) {
      if (inputValue) {
        if (inputValue.length < 50) {
          editTitle(props.task.id);
          setActive(!inputActive);
        } else {
          toast.warn("Too long text in text field");
        }
      } else {
        toast.warn("Empty task text field");
      }
    }
  };

  return (
    <div className="task-list-item"
         style={{backgroundColor: props.task.done ? "rgba(31, 30, 29,0.2)" : "white"}}>
      <div className="item-checkbox">
        <input checked={props.task.done ? "checked" : ""} onClick={() => {
          props.markTask(props.task.id)
        }} type="checkbox" id={props.task.id}/>
        <label htmlFor={props.task.id}></label>
      </div>
      <div className="task-items-content">
        <input
          onKeyDown={(e) => {
            keyChecker(e);
          }}
          disabled={inputActive ? '' : 'disabled'}
          key={props.task.id}
          type="text"
          value={inputValue}
          ref={inputRef}
          onChange={event => {
            setValue(event.target.value)
          }}
          style={{backgroundColor: props.task.done ? "rgba(31, 30, 29,0.1)" : "white"}}/>
      </div>
      <div className="task-items-actions">
        <a onClick={() => {
          props.markImportantTask(props.task.id);
        }}><FontAwesomeIcon icon={props.task.important ? sStar : rStar}/></a>
        <a onClick={async () => {
          await setActive(!inputActive);
          focusTextInput();
        }}><FontAwesomeIcon icon={faEdit}/></a>
        <a onClick={() => {
          removeI(props.task.id)
        }}><FontAwesomeIcon icon={faTimes}/></a>
      </div>
    </div>
  )
};

export default connect(() => {
  return {}
}, {removeTask, markTask, updateTaskTitle, markImportantTask})(SchedulerRow);
