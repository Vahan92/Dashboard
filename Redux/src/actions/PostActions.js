import { SUCCESSFULY_REGISTERED, I_AM_A_TEAPOT, LOGIN_SUCCESS, LOGIN_ERROR } from './types';
import axios from "axios";
import { message } from 'antd';
import setAuthToken from '../components/utils/setAuthorizationToken';
import jwt from 'jwt-decode';

export const addUser = postData => dispatch => {
  axios
    .post('http://localhost:4000/api/register', postData).then(res => {
      dispatch({
        type: SUCCESSFULY_REGISTERED,
        payload: res
      })
      message.success('User successfully registered', 7);
    }).catch((error) => {
      if (error.response.status === 409) {
        dispatch({
          type: SUCCESSFULY_REGISTERED,
          payload: error
        })
        message.error('This email is already in use', 7);
      }
      if (error.response.status === 418) {
        dispatch({
          type: I_AM_A_TEAPOT,
          payload: error
        })
      }
    })
}

export const login = userInput => dispatch => {
  axios
    .post('http://localhost:4000/api/auth', {
      email: userInput.email,
      password: userInput.password
    }).then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
      })
      console.log('res', res);
      console.log('jwt decoded', jwt(res.data));
      localStorage.setItem("jwt", res.data)
      setAuthToken(res.data);
      window.location.pathname = '/panel';
    }).catch((error) => {
      if (error.response.status >= 400) {
        dispatch({
          type: LOGIN_ERROR,
        })
      }
    })
}
