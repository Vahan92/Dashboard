import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Table } from 'react-bootstrap';
import { Icon, Popconfirm } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { fetchReports, deleteReport, saveChanges } from '../../actions/ReportActions';

function AddReports() {
  const [report, setReport] = useState({ name: "", description: "", estimation: "", spent: "" });

  const dispatch = useDispatch();
  const results = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);  

  const onChange = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setReport({ ...report, [name]: newValue });
  }

  const edit = (reportId) => {
    const EditReport = results.reportsReducer.reports.find(value => value.id === reportId);
    setReport(EditReport);
    dispatch({ type: "SUCCESS_EDIT_REPORT" })
  } 

  const showModal = () => {
    setReport({ name: "", description: "", estimation: "", spent: "" });
    dispatch({ type: "SUCCESS_EDIT_REPORT" })
  }

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  return (
    <div>
      {results.reportsReducer.loading ? (
        "Loading..."
      ) : results.reportsReducer.reports.length && <Table responsive>
        <thead>
          <tr>
            {Object.keys(results.reportsReducer.reports[0]).filter(value => value !== "id" && value !== "status").map(el => (
              <th key={el}>{el}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.reportsReducer.reports.map(el => (
            <tr key={el.name}>
              <td>{el.name}</td>
              <td>{el.description}</td>
              <td>{el.estimation}</td>
              <td>{el.spent}</td>
              <td>
                <Popconfirm
                  title="Are you sure you want to delete this report?"
                  placement="left"
                  onConfirm={() => dispatch(deleteReport(el))}
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
        show={results.reportsReducer.showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => dispatch({ type: "CANCEL_EDIT_REPORT" })}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Adding report
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ width: "100%", padding: "0 0.5rem" }}>
            {Object.keys(report).filter(value => value !== "id" && value !=="status").map(el => (
              <Form.Group key={el}>
                <Form.Label>
                  {el} :
                </Form.Label>
                {el !== "description" ? <Form.Control onChange={onChange} defaultValue={report[el]} type={el === "name" ? "text" : "number"} name={el} /> : <Form.Control onChange={onChange} as="textarea" style={{ resize: 'none', height: '150px' }} name={el} defaultValue={report[el]} />}
              </Form.Group>
            ))}
            <div style={{ textAlign: "right" }}>
              <Button style={{ marginRight: "0.5rem" }} className="btn btn-success" onClick={() => dispatch(saveChanges(report, results.reportsReducer.reports))}>Save</Button>
              <Button className="btn btn-danger" onClick={() => dispatch({ type: "CANCEL_EDIT_REPORT" })}>Cancel</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AddReports;
