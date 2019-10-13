import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {filterTasks} from "../../redux/actions";

class SchedulerSearch extends React.Component{
  constructor(props){
    super(props)
  };
  render() {
    return (
      <div className="search">
        <input onChange={event => {this.props.filterTasks(event.target.value)}} type="text" className="searchTerm" placeholder="Search"/>
        <button type="submit" className="searchButton">
          <FontAwesomeIcon icon={faSearch}/>
        </button>
      </div>
    )
  }
}
export default connect(()=>{return{}},{filterTasks})(SchedulerSearch);
