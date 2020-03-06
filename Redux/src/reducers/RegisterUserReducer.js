import { SUCCESSFULY_REGISTERED, I_AM_A_TEAPOT } from '../actions/types';

const initialState = {
  validationFail: false,
  status: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SUCCESSFULY_REGISTERED:
      return {
        ...state,
        status: action.payload.status,
        validationFail: false
      };
    case I_AM_A_TEAPOT:
      return {
        ...state,
        status: action.payload.response.status,
        validationFail: true
      };
    default:
      return state;
  }
}
