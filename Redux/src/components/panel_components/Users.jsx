import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form, Table, Button, Modal } from 'react-bootstrap';
import RegisterUser from '../RegisterUser';
import { Icon, Popconfirm } from 'antd';
import { fetchUsers, confirm, saveEdit } from '../../actions/UserActions';
import { saveChanges, fetchOverviewReports } from '../../actions/ReportActions';

function Users() {
  const [registering, setRegistration] = useState(false);
  const [reportsModal, showReportsModal] = useState(false);
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: '',
      password: ''
    }
  );

  const dispatch = useDispatch();
  const results = useSelector(state => state);

  const margins = {
    margin: "1rem 0",
    fontWeight: "bold"
  }

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const showRegistration = () => {
    dispatch({ type: "CLOSE_MODAL" })
    setRegistration(true);
  }

  const userReports = (userId) => {
    dispatch(fetchOverviewReports(userId));
    showReportsModal(true);
  }

  const goBack = () => {
    setRegistration(false);
    dispatch(fetchUsers());
  }

  const onChange = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserInput({ ...userInput, [name]: newValue });
  }

  const saveReportChanges = () => {
    delete userInput['password'];
    dispatch(saveEdit(userInput));
  }

  const approveReport = (report, reports, userId) => {
    report.status = "Approved";
    dispatch(saveChanges(report, reports, userId));
  }

  const denyReport = (report, reports, userId) => {
    report.status = "Denided";
    dispatch(saveChanges(report, reports, userId));
  }

  const edit = user => {
    setUserInput(user);
    dispatch({type: "EDIT_USER"});
  }

  return (
    <>
      {results.usersReducer.loading ? (
        "Loading..."
      ) : registering ? (
        <RegisterUser />
      ) : (
            <>
              <Table responsive>
                <thead>
                  <tr>
                    {Object.keys(results.usersReducer.users[0]).filter(el => el !== "_id").map(el => (
                      <th key={el}>{el}</th>
                    ))}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {results.usersReducer.users.map(el => (
                    <tr key={el.email}>
                      <td onClick={() => { userReports(el._id) }}>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.role}</td>
                      <td>
                        <Popconfirm
                          title="Are you sure you want to delete this user?"
                          placement="left"
                          onConfirm={() => dispatch(confirm(el.email))}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Icon type="delete" style={{ color: 'red', marginRight: "0.5rem" }} />
                        </Popconfirm>
                        <Icon type="edit" style={{ color: "#e6e600" }} onClick={() => edit(el)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>
                <Button onClick={showRegistration} variant="outline-primary">Add User</Button>
              </div>
              <p style={margins}>Click on user name to see the reports</p>
            </>
          )}
      {registering && <Button onClick={goBack}>Go Back</Button>}
      <Modal
        show={results.usersReducer.modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => dispatch({ type: "CLOSE_MODAL" })}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Editing user info
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ width: "100%", padding: "0 0.5rem" }}>
            {Object.keys(userInput).filter(val => val !== "_id" && val !== "password").map(el => (
              <Form.Group key={el}>
                <Form.Label>
                  {el} :
                </Form.Label>
                <Form.Control onChange={onChange} defaultValue={userInput[el]} type={el === "email" ? "email" : "text"} name={el} />
              </Form.Group>
            ))}
            <div style={{ textAlign: "right" }}>
              <Button style={{ marginRight: "0.5rem" }} className="btn btn-success" onClick={saveReportChanges}>Save</Button>
              <Button className="btn btn-danger" onClick={() => dispatch({ type: "CLOSE_MODAL" })}>Cancel</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        style={{ textAlign: "center" }}
        show={reportsModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => { showReportsModal(false) }}
      >
        <Modal.Header style={{ textAlign: "center" }} closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            User report description
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Name: {results.reportsReducer.overview['name']}</p>
            <p>Email: {results.reportsReducer.overview['email']}</p>
          </div>
          {results.reportsReducer.overview.reports && results.reportsReducer.overview.reports.length > 0 ? <>
            <h2>Reports</h2>
            <p style={margins}>Click on the status in order to approve or to deny report</p>
            <Table responsive>
              <thead>
                <tr>
                  {Object.keys(results.reportsReducer.overview.reports[0]).filter(el => el !== "id").map(el => (
                    <th key={el}>{el}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.reportsReducer.overview.reports.map(el => (
                  <tr key={el.name}>
                    <td>{el.name}</td>
                    <td>{el.description}</td>
                    <td>{el.estimation}</td>
                    <td>{el.spent}</td>
                    <Popconfirm
                      title="Approve this report?"
                      placement="left"
                      onConfirm={() => approveReport(el, results.reportsReducer.reports, results.reportsReducer.overview._id)}
                      onCancel={() => denyReport(el, results.reportsReducer.reports, results.reportsReducer.overview._id)}
                      okText="Approve"
                      cancelText="Deny"
                    >
                      <td><a href="/#">{el.status}</a></td>
                    </Popconfirm>
                  </tr>
                ))}
              </tbody>
            </Table>
          </> : <h5>This user does not have any reports</h5>}
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Users;