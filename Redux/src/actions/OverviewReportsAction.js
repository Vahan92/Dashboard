import { FETCH_OVERVIEW_REPORTS } from './types';

export const fetchOverviewReports = id => dispatch => {
  fetch(`http://localhost:4000/api/getOverviewReports/${id}`)
    .then(res => res.json())
    .then(reports =>
      dispatch({
        type: FETCH_OVERVIEW_REPORTS,
        payload: reports
      })
    );
};