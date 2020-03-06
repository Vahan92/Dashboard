import { FETCH_REPORTS, SUCCESS_EDIT_REPORT, CANCEL_EDIT_REPORT, FETCH_OVERVIEW_REPORTS } from '../actions/types';

const initialState = {
  reports: [],
  overview: [],
  loading: true,
  showModal: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_REPORTS:
      return {
        ...state,
        reports: action.payload,
        loading: false
      };
    case SUCCESS_EDIT_REPORT:
      return {
        ...state,
        showModal: true,
      };
      case CANCEL_EDIT_REPORT:
      return {
        ...state,
        showModal: false,
      };
      case FETCH_OVERVIEW_REPORTS:
      return {
        ...state,
        overview: action.payload,
      };
    default:
      return state;
  }
}
