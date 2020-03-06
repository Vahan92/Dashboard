import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Table } from 'react-bootstrap';
import { message, Icon, Popconfirm } from 'antd';
import jwt from 'jwt-decode';
import axios from 'axios';

function AddReports() {
  const userInfo = jwt(localStorage.getItem("jwt"));

  const [modalShow, setModalShow] = useState(false);
  const [reports, setReports] = useState([]);
  const [reportsModal, showReportsModal] = useState(false);
  const [report, setReport] = useState({ name: "", description: "", estimation: "", spent: "" });
  const [loading, setLoading] = useState(true);

  async function fetchUrl() {
    const response = await fetch(`http://localhost:4000/api/getUserReports/${userInfo["_id"]}`);
    const json = await response.json();
    setReports(json);
    setLoading(false);
  }

  const onChange = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setReport({ ...report, [name]: newValue });
    console.log(`report ---`, report)
  }

  const saveChanges = () => {
    console.log(report)
    if (report.id) {
      console.log(`---------- inside if ---------`);
      axios.patch(`http://localhost:4000/api/updateReport/${userInfo["_id"]}`, report)
        .then(function (response) {
          message.success('User information successfully updated', 7);
          fetchUrl();
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
    } else {
      console.log(`---------- outside if ---------`);
      for (let i = 0; i < reports.length; ++i) {
        if (reports[i].name === report.name) {
          message.error('Name of report should be unique', 7);
          return false;
        }
      }
      axios.patch(`http://localhost:4000/api/addReport/${userInfo["_id"]}`, report)
        .then(function (response) {
          message.success('Your report was successfully added', 7);
          setModalShow(false);
          fetchUrl();
          console.log(response);
        })
        .catch(function (error) {
          message.error(error.response.data, 7);
          console.log(`error ---- `, error.response.data);
        });
    }
  }

  const confirm = (email) => {
    axios
      .delete('http://localhost:4000/api/deleteUser', {
        data: { email: email }
      }).then(res => {
        console.log('res', res);
        message.success('User successfully deleted', 7);
        fetchUrl();
      }).catch((error) => {
        if (error.response.status === 404) {
          message.error('There is not such a user', 7);
        }
      })
  }

  const edit = (reportId) => {
    const EditReport = reports.find(value => value.id === reportId);
    setReport(EditReport);
    setModalShow(true)
  }

  const deleteReport = (user) => {
    axios.patch(`http://localhost:4000/api/deleteReport/${userInfo["_id"]}`, { name: user["name"] })
      .then(function (response) {
        message.success('Report successfully deleted', 7);
        fetchUrl();
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          message.error('There is not such a report', 7);
        }
        if (error.response.status === 400) {
          message.error(error.response.data, 7)
        }
        console.log(`error ---- `, error.response.data);
      });
  }

  const showModal = () => {
    setReport({ name: "", description: "", estimation: "", spent: "" });
    setModalShow(true)
  }

  useEffect(() => {
    fetchUrl();
  }, []);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : <Table responsive>
          <thead>
            <tr>
              {Object.keys(reports[0]).filter(value => value !== "id").map(el => (
                <th key={el}>{el}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(el => (
              <tr key={el.name}>
                <td>{el.name}</td>
                <td>{el.description}</td>
                <td>{el.estimation}</td>
                <td>{el.spent}</td>
                <td>
                  <Popconfirm
                    title="Are you sure you want to delete this user?"
                    placement="left"
                    onConfirm={() => deleteReport(el)}
                    // onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Icon type="delete" style={{ color: 'red', marginRight: "0.5rem" }} />
                  </Popconfirm>
                  <Icon type="edit" style={{ color: "#e6e600" }} onClick={() => edit(el.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>}
      <Button onClick={showModal}>Add Report</Button>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Adding report
                </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ width: "100%", padding: "0 0.5rem" }}>
            {Object.keys(report).filter(value => value !== "id").map(el => (
              <Form.Group key={el}>
                <Form.Label>
                  {el} :
                </Form.Label>
                {el !== "description" ? <Form.Control onChange={onChange} defaultValue={report[el]} type={el === "name" ? "text" : "number"} name={el} /> : <Form.Control onChange={onChange} as="textarea" style={{ resize: 'none', height: '150px' }} name={el} defaultValue={report[el]} />}
              </Form.Group>
            ))}
            <div style={{ textAlign: "right" }}>
              <Button style={{ marginRight: "0.5rem" }} className="btn btn-success" onClick={saveChanges}>Save</Button>
              <Button className="btn btn-danger" onClick={() => setModalShow(false)}>Cancel</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AddReports;
