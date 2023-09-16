// actions/userActions.js
import axios from 'axios';

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/auth/login', { email, password });
    console.log(data)
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    localStorage.setItem('authToken', JSON.stringify(data.token));
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const signupUser = (email, password) => async (dispatch) => {
  try {
      const { data } = await axios.post('/api/auth/signup', { email, password });
      console.log(data)
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      localStorage.setItem('authToken', JSON.stringify(data.token));
  } catch (error) {
      const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;
      dispatch({ type: SIGNUP_FAILURE, payload: errorMessage });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: 'USER_LOGOUT' });
};
