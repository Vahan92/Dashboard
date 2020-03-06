import { LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/types';

const initialState = {
  loggedIn: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loggedIn: true,
      };
    default:
      return state;
  }
}
