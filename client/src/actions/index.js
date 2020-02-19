import axios from 'axios';
import {FETCH_USER} from './types';

export const fetchUser = () => {
  return async dispatch => {
  const respond = await axios.get('/api/current_user');
  dispatch({
      type: FETCH_USER,
      payload: respond.data
  })
  }
}

export const handleToken = (token) => {
  return async dispatch => {
    const res = await axios.post('/api/stripe', token);
  dispatch({type: FETCH_USER,
    payload: res.data});  
  }
} 