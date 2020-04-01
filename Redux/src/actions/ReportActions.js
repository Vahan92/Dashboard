import { FETCH_REPORTS, SUCCESS_EDIT_REPORT } from './types';
import axios from "axios";
import { message } from 'antd';
import jwt from 'jwt-decode';

const userInfo = localStorage.getItem("jwt") && jwt(localStorage.getItem("jwt"));

export const fetchReports = () => dispatch => {
  fetch(`http://localhost:4000/api/getUserReports/${userInfo["_id"]}`)
    .then(res => res.json())
    .then(reports =>
      dispatch({
        type: FETCH_REPORTS,
        payload: reports
      })
    );
};

export const deleteReport = report => dispatch => {
  axios.patch(`http://localhost:4000/api/deleteReport/${userInfo["_id"]}`, { name: report["name"] })
    .then(function (response) {
      message.success('Report successfully deleted', 7);
      dispatch(fetchReports());
    })
    .catch(function (error) {
      if (error.response.status === 404) {
        message.error('There is not such a report', 7);
      }
      if (error.response.status === 400) {
        message.error(error.response.data, 7)
      }
    });
}

export const deleteSelectedReports = reports => dispatch => {
  axios.patch(`http://localhost:4000/api/deleteSelectedReports/${userInfo["_id"]}`, { names: reports })
    .then(function (response) {
      message.success('Reports successfully deleted', 7);
      dispatch(fetchReports());
    })
    .catch(function (error) {
      if (error.response.status === 404) {
        message.error('There is not such a report', 7);
      }
      if (error.response.status === 400) {
        message.error(error.response.data, 7)
      }
    });
}

export const saveChanges = (report, reports, userId) => dispatch => {
  if (report.id) {
    axios.patch(`http://localhost:4000/api/updateReport/${userId ? userId : userInfo["_id"]}`, report)
      .then(function (response) {
        message.success('User information successfully updated', 7);
        dispatch(fetchReports());
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          message.error('There is not such a user', 7);
        }
        if (error.response.status === 400) {
          message.error(error.response.data, 7)
        }
      });
  } else {
    for (let i = 0; i < reports.length; ++i) {
      if (reports[i].name === report.name) {
        message.error('Name of report should be unique', 7);
        return false;
      }
    }
    axios.patch(`http://localhost:4000/api/addReport/${userInfo["_id"]}`, report)
      .then(function (response) {
        message.success('Your report was successfully added', 7);
        dispatch({
          type: SUCCESS_EDIT_REPORT,
        })
        dispatch(fetchReports());
      })
      .catch(function (error) {
        message.error(error.response.data, 7);
      });
  }
}
