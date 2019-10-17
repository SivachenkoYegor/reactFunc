import React, { useEffect } from 'react';
import './Scheduler.css';
import {connect} from 'react-redux';
import {addTask, removeTask, requestTasks} from '../../redux/actions';
import SchedulerRow from './SchedulerRow'
import SchedulerAddTask from './SchedulerAdd'
import SchedulerSearch from './SchedulerSearch';
import SchedulerFooter from './SchedulerFooter';


const SchedulerMain = (props) => {

  const sorter = (array) => {
    return array.sort((fTask, sTask) => {
      if (fTask.important === sTask.important) {
        return 0;
      }
      return fTask.important ? -1 : 1;
    });
  };
  useEffect(() => {
    props.requestTasks();
  }, []);
  let list;
  if (props.taskList) {
    list = props.taskList
      .filter(item => item.title.toLowerCase()
        .includes(props.filterData.toLowerCase()));
    list = [
      ...sorter(
        list.filter(task => !task.done)     //sorting for not done tasks
      ),
      ...sorter(
        list.filter(task => task.done)      //sorting for done tasks
      )].map(task => {
      return (
        <SchedulerRow key={task.id} task={task}/>
      )
    });
  }
  return (
    <div className="Scheduler-container">
      <div className="Scheduler-inner-container">
        <header className="Scheduler-header">
          <h2>Scheduler</h2>
          <div>
            <SchedulerSearch/>
          </div>
        </header>
        <section className="content">
          <SchedulerAddTask/>
          <div>
            <div className="task-list">
              {list}
            </div>
          </div>
        </section>
        <SchedulerFooter/>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  taskList: state.schedulerReducer.taskList,
  filterData: state.schedulerReducer.filterData
});
export default connect(mapStateToProps, {removeTask, addTask, requestTasks})(SchedulerMain);
