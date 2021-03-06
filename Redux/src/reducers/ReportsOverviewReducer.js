import { FETCH_OVERVIEW_REPORTS } from '../actions/types';

const initialState = {
  overview: [],
  loading: true,
  showModal: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_OVERVIEW_REPORTS:
      return {
        ...state,
        overview: action.payload,
      };
    default:
      return state;
  }
}
