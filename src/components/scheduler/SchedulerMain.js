import React from 'react';
import './Scheduler.css';
import {connect} from 'react-redux';
import {addTask, removeTask, requestTasks} from '../../redux/actions';
import SchedulerRow from './SchedulerRow'
import SchedulerAddTask from './SchedulerAdd'
import SchedulerSearch from './SchedulerSearch';
import SchedulerFooter from './SchedulerFooter';


class SchedulerMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    }
  }

  sorter = (array) => {
    return array.sort((fTask, sTask) => {
      if (fTask.important === sTask.important) {
        return 0;
      }
      return fTask.important ? -1 : 1;
    });
  };

  componentDidMount() {
    this.props.requestTasks();
  }

  render() {
    let list;
    if (this.props.taskList) {
      list = this.props.taskList
        .filter(item => item.title.toLowerCase()
          .includes(this.props.filterData.toLowerCase()));
      let
        notDone = list.filter(task => !task.done),
        done = list.filter(task => task.done);
      list = [...this.sorter(notDone), ...this.sorter(done)].map(task => {
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
  }
}

const mapStateToProps = (state) => ({
  taskList: state.schedulerReducer.taskList,
  filterData: state.schedulerReducer.filterData
});
export default connect(mapStateToProps, {removeTask, addTask, requestTasks})(SchedulerMain);
