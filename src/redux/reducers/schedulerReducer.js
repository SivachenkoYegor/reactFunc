import {
  ADD_TASK,
  REMOVE_TASK,
  MARK_TASK,
  FILTER_TASKS,
  UPDATE_TASK,
  MARK_AS_IMPORTANT,
  MARK_ALL_TASKS, SET_TASKS
} from "../actionTypes";
import {api} from "../../api/Instance";

export default function (state = {
  taskList: [],
  filterData:"",
}, action) {
  switch (action.type) {
    case ADD_TASK: {
      return {
        ...state,
        taskList: [
          action.payload,
          ...state.taskList
        ]
      }
    }
    case REMOVE_TASK: {
      let {id} = action.payload;
      let taskList = state.taskList.filter( (item) => item.id !== id);
      return {
        ...state,
        taskList: taskList,
      };
    }
    case MARK_TASK: {
      const  { id } = action.payload;
      const index = state.taskList.findIndex((item) => item.id === id);
      const object = {...state.taskList[index], done: !state.taskList[index].done};
      api().put(id, object);
      return {
        ...state,
        taskList: [...state.taskList.slice(0, index),
          object,
          ...state.taskList.slice(index + 1)],
      };
    }
    case FILTER_TASKS:{
      return {
        ...state,
        filterData: action.payload.data,
      }
    }
    case UPDATE_TASK:{
      const { id, title } =action.payload;
      let index = state.taskList.findIndex(item => item.id===id);
      const object = {...state.taskList[index], title};
      api().put(id, object);
      return {
        ...state,
        taskList: [...state.taskList.slice(0, index),
          object,
          ...state.taskList.slice(index + 1)],
      };
    }
    case MARK_AS_IMPORTANT:{
      const { id } =action.payload;
      let index = state.taskList.findIndex(item => item.id===id);
      const object = {...state.taskList[index], important: !state.taskList[index].important};
      api().put(id, object);
      return {
        ...state,
        taskList: [...state.taskList.slice(0, index),
          object,
          ...state.taskList.slice(index + 1)],
      };
    }
    case MARK_ALL_TASKS:{
      const taskList = state.taskList.map(task => {
        let doneTask = {...task, done:action.payload};
        api().put(task.id,doneTask);
        return doneTask;
      });
      return {
        ...state,taskList
      }
    }
    case SET_TASKS:{
      return {
        ...state, taskList: action.payload
      }
    }
    default:
      return state
  }
}
