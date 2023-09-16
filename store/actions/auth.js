// actions/userActions.js
import axios from 'axios';

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/auth/login', { email, password });
    dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: 'USER_LOGOUT' });
};
