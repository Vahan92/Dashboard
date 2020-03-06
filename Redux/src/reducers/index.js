import { combineReducers } from 'redux';
import postReducer from './PostReducer';
import usersReducer from './UsersReducer';
import registerUserReducer from './RegisterUserReducer';
import loginReducer from './LoginReducer';
import reportsReducer from './ReportsReducer';

export default combineReducers({
  posts: postReducer,
  registerUser: registerUserReducer,
  loginReducer,
  usersReducer,
  reportsReducer
});
