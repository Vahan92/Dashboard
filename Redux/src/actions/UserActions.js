import { FETCH_USERS, EDIT_USER } from './types';
import axios from "axios";
import { message } from 'antd';

export const fetchUsers = () => dispatch => {
  fetch("http://localhost:4000/api/getUsers")
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: FETCH_USERS,
        payload: posts
      })
    );
};

export const confirm = (email) => dispatch => {
  axios
    .delete('http://localhost:4000/api/deleteUser', {
      data: { email: email }
    }).then(res => {
      console.log('res', res);
      message.success('User successfully deleted', 7);
      dispatch(fetchUsers());
    }).catch((error) => {
      console.log('error', error);
      if (error.response.status === 404) {
        message.error('There is not such a user', 7);
      }
    })
}

export const saveEdit = (user) => dispatch => {
axios.patch(`http://localhost:4000/api/updateUser/${user["_id"]}`, user)
      .then(function (response) {
        message.success('User information successfully updated', 7);
        dispatch(fetchUsers());
        console.log(response);
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          message.error('There is not such a user', 7);
        }
        if (error.response.status === 400) {
          message.error(error.response.data, 7)
        }
        console.log(`error ---- `, error.response.data);
      });
  }

