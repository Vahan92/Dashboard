import { FETCH_USERS, EDIT_USER, CLOSE_MODAL } from '../actions/types';

const initialState = {
  users: [],
  user: {},
  loading: true,
  modalShow: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case EDIT_USER:
      return {
        ...state,
        user: action.payload,
        modalShow: true
      };
      case CLOSE_MODAL:
      return {
        ...state,
        modalShow: false
      };
    default:
      return state;
  }
}
