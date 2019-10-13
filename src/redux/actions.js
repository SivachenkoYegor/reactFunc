import {
  ADD_TASK,
  REMOVE_TASK,
  MARK_TASK,
  FILTER_TASKS,
  UPDATE_TASK,
  MARK_AS_IMPORTANT,
  MARK_ALL_TASKS,
  SET_TASKS
} from "./actionTypes";
import {api} from "../api/Instance";

export const requestTasks = () =>
  (dispatch) =>
    api().get()
      .then(({data}) => {
        dispatch(setRows(data));
      });

function setRows(data) {
  return {
    type: SET_TASKS,
    payload: data
  }
}

export function addTask(data) {
  let newTask = {
    title: data,
    done: false,
    important: false,
    id: `f${(~~(Math.random() * 1e8)).toString(16)}`
  };
  return (dispatch) =>
    api().post(newTask).then(res => {
      return res.status === 201 ?
        dispatch({
          type: ADD_TASK,
          payload: newTask,
        })
        : null
    });
}

export function removeTask(id) {
  return (dispatch) =>
    api().delete(id).then(res =>
      res.status === 200 ?
        dispatch({
          type: REMOVE_TASK,
          payload: {id},
        })
        : null);
}

export function markTask(id) {
  return {
    type: MARK_TASK,
    payload: {id},
  }
}

export function filterTasks(data) {
  return {
    type: FILTER_TASKS,
    payload: {data}
  }
}

export function updateTaskTitle(id, title) {
  return {
    type: UPDATE_TASK,
    payload: {id, title}
  }
}

export function markImportantTask(id) {
  return {
    type: MARK_AS_IMPORTANT,
    payload: {id}
  }
}

export function markAllTasks(type) {
  return {
    type: MARK_ALL_TASKS,
    payload: type
  }
}
