import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {filterTasks} from "../../redux/actions";

const SchedulerSearch = (props) => {
  return (
    <div className="search">
      <input onChange={event => {
        props.filterTasks(event.target.value)
      }} type="text" className="searchTerm" placeholder="Search"/>
      <button type="submit" className="searchButton">
        <FontAwesomeIcon icon={faSearch}/>
      </button>
    </div>
  )
};
export default connect(() => {
  return {}
}, {filterTasks})(SchedulerSearch);
