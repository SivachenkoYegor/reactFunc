import axios from 'axios';
import React from "react";
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
export const api = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:3001',
  });
  loadProgressBar(null, instance);
  return {
    get() {
      return instance.get('/tasks/');
    },
    post(params) {
      return instance.post('/tasks/', params)
    },
    put(id, params) {
      return instance.put('/tasks/'+id, params);
    },
    delete(params) {
      return instance.delete('/tasks/'+params);
    }
  }
};

export default { api };
