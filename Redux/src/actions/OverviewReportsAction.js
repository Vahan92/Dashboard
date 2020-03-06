import { FETCH_OVERVIEW_REPORTS, SUCCESS_EDIT_REPORT } from './types';
import axios from "axios";
import { message } from 'antd';
import jwt from 'jwt-decode';

const userInfo = localStorage.getItem("jwt") && jwt(localStorage.getItem("jwt"));

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