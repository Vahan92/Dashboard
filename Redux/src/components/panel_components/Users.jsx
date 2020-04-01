import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form, Table, Button, Modal } from 'react-bootstrap';
import RegisterUser from '../RegisterUser';
import { Icon, Popconfirm } from 'antd';
import { fetchUsers, confirm, edit, saveEdit, deleteMany } from '../../actions/UserActions';
import { saveChanges } from '../../actions/ReportActions'
import { fetchOverviewReports } from '../../actions/OverviewReportsAction';
import jwt from 'jwt-decode';

function Users() {
  const [registering, setRegistration] = useState(false);
  const [reportsModal, showReportsModal] = useState(false);
  const [deleteArray, setDeleteArray] = useState([]);
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: '',
      password: ''
    }
  );

  const userInfo = localStorage.getItem("jwt") && jwt(localStorage.getItem("jwt"));

  const dispatch = useDispatch();
  const results = useSelector(state => state);

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

  const approveReport = (report, userId) => {
    report.status = "Approved";
    dispatch(saveChanges(report, results.reportsReducer.reports, userId));
  }

  const denyReport = (report, userId) => {
    report.status = "Denied";
    dispatch(saveChanges(report, results.reportsReducer.reports, userId));
  }

  const onChange = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserInput({ [name]: newValue });
  }

  const saveChangedReport = e => {
    e.preventDefault();
    delete userInput['password'];
    delete userInput['_id'];
    dispatch(saveEdit(results.usersReducer.user, userInput));
  }

  const editUser = user => {
    setUserInput(user);
    dispatch(edit(user._id))
  }

  const selectToDelete = id => {
    const index = deleteArray.indexOf(id);
    if (index !== -1) {
      setDeleteArray(deleteArray.filter(value => value !== id));
    } else {
      setDeleteArray(oldArray => [...oldArray, id]);
    }
  }

  const deleteSelectedUsers = () => {
    dispatch(deleteMany(deleteArray));
    setDeleteArray([]);
  }

  const deleteUser = user => {
    const index = deleteArray.indexOf(user._id);
    if (index !== -1) setDeleteArray(deleteArray.filter(value => value !== user._id));
    dispatch(confirm(user.email))
  }

  const addUser = !registering && userInfo.role === "admin";

  return (
    <>
      {results.usersReducer.loading ? (
        "Loading..."
      ) : registering ? (
        <RegisterUser />
      ) : results.usersReducer.users.length ? (
        <>
          <Table responsive>
            <thead>
              <tr>
                {Object.keys(results.usersReducer.users[0]).filter(el => el !== "_id").map(el => (
                  <th key={el}>{el}</th>
                ))}
                {userInfo.role === "admin" && <>
                  <th>Actions</th>
                  <th>
                    <Popconfirm
                      title="Are you sure you want to delete selected cars?"
                      placement="left"
                      onConfirm={deleteSelectedUsers}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button disabled={deleteArray.length < 2} variant="outline-primary">Delete selected</Button>
                    </Popconfirm>
                  </th>
                </>}
              </tr>
            </thead>
            <tbody>
              {results.usersReducer.users.filter(value => value._id !== userInfo._id).map(el => (
                <tr key={el.email}>
                  <td onClick={() => { userReports(el._id) }}>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.role}</td>
                  {userInfo.role === "admin" && <>
                  <td>
                    <Popconfirm
                      title="Are you sure you want to delete this user?"
                      placement="left"
                      onConfirm={() => deleteUser(el)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Icon type="delete" style={{ color: 'red', marginRight: "0.5rem" }} />
                    </Popconfirm>
                    <Icon type="edit" style={{ color: "#e6e600" }} onClick={() => editUser(el)} />
                  </td>
                  <td><input onClick={() => { selectToDelete(el._id) }} type="checkbox" /></td>
                  </>}
                </tr>
              ))}
            </tbody>
          </Table>
          <p>Click on a user to open reports</p>
        </>
      ) : <h5>There aren't any users</h5>}
      {registering && <Button onClick={goBack}>Go Back</Button>}
      <div>
        {addUser && <Button onClick={showRegistration} variant="outline-primary">Add User</Button>}
      </div>
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
          <Form onSubmit={saveChangedReport} style={{ width: "100%", padding: "0 0.5rem" }}>
            {Object.keys(results.usersReducer.user).filter(val => val !== "_id").map(el => (
              <Form.Group key={el}>
                <Form.Label>
                  {el} :
                </Form.Label>
                <Form.Control onChange={onChange} defaultValue={results.usersReducer.user[el]} type={el === "email" ? "email" : "text"} name={el} />
              </Form.Group>
            ))}
            <div style={{ textAlign: "right" }}>
              <Button style={{ marginRight: "0.5rem" }} className="btn btn-success" type="submit">Save</Button>
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
            <p>Name: {results.ReportsOverviewReducer.overview['name']}</p>
            <p>Email: {results.ReportsOverviewReducer.overview['email']}</p>
          </div>
          {results.ReportsOverviewReducer.overview.reports && results.ReportsOverviewReducer.overview.reports.length > 0 ? <>
            <h2>Reports</h2>
            <Table responsive>
              <thead>
                <tr>
                  {Object.keys(results.ReportsOverviewReducer.overview.reports[0]).filter(el => el !== "id").map(el => (
                    <th key={el}>{el}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.ReportsOverviewReducer.overview.reports.map(el => (
                  <tr key={el.name}>
                    <td>{el.name}</td>
                    <td>{el.description}</td>
                    <td>{el.estimation}</td>
                    <td>{el.spent}</td>
                    <td>
                      <Popconfirm
                        title="Approve or deny?"
                        placement="left"
                        onConfirm={() => { approveReport(el, results.ReportsOverviewReducer.overview._id) }}
                        onCancel={() => { denyReport(el, results.ReportsOverviewReducer.overview._id) }}
                        okText="Approve"
                        cancelText="Deny"
                      >
                        <a href="/">{el.status}</a>
                      </Popconfirm>
                    </td>
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