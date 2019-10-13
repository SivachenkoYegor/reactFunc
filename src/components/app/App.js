import React from 'react';
import './App.css';
import SchedulerMain from '../scheduler/SchedulerMain';
import { toast } from "react-toastify";

toast.configure();
function App() {
  return (
    <div>
        <SchedulerMain />
    </div>
);
}

export default App;
