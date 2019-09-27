import React, { useState, useEffect, useReducer } from 'react';
import { Form, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import Registration from '../registration';
import { Icon, Popconfirm, message } from 'antd';
import axios from 'axios';

function Users() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [registering, setRegistration] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            email: '',
            password: ''
        }
    );

    async function fetchUrl() {
        const response = await fetch("http://localhost:4000/api/getUsers");
        const json = await response.json();
        setUsers(json);
        console.log(json);
        setLoading(false);
    }

    useEffect(() => {
        fetchUrl();
    }, []);

    const showRegistration = () => {
        setRegistration(true);
    }

    const goBack = () => {
        setRegistration(false);
        fetchUrl();
    }

    const onChange = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        console.log(`name ---`, name);
        console.log(`value ====`, newValue);
        setUserInput({ [name]: newValue });
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

    const edit = (id) => {
        axios.get(`http://localhost:4000/api/getUser/${id}`, {
        })
            .then(function (response) {
                setUser(response.data);
                setUserInput(response.data);
                console.log(response);
                setModalShow(true);
                console.log(user);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const saveChanges = () => {
        console.log(`user ----`, user);
        delete userInput['password'];
        delete userInput['_id'];
        console.log(`userInput ----`, userInput)
        axios.patch(`http://localhost:4000/api/updateUser/${user["_id"]}`, userInput)
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
    }

    return (
        <>
            {loading ? (
                "Loading..."
            ) : registering ? (
                <Registration />
            ) : (
                        <>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        {Object.keys(users[0]).filter(el => el !== "_id").map(el => (
                                            <th key={el}>{el}</th>
                                        ))}
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(el => (
                                        <tr key={el.email}>
                                            <td>{el.name}</td>
                                            <td>{el.email}</td>
                                            <td>{el.role}</td>
                                            <td>
                                                <Popconfirm
                                                    title="Are you sure you want to delete this user?"
                                                    placement="left"
                                                    onConfirm={() => confirm(el.email)}
                                                    // onCancel={cancel}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Icon type="delete" style={{ color: 'red', marginRight: "0.5rem" }} />
                                                </Popconfirm>
                                                <Icon type="edit" style={{ color: "#e6e600" }} onClick={() => edit(el._id)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div>
                                <Button onClick={showRegistration} variant="outline-primary">Add User</Button>
                            </div>
                        </>
                    )}
            {registering && <Button onClick={goBack}>Go Back</Button>}
            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setModalShow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Editing user info
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form style={{ width: "100%", padding: "0 0.5rem" }}>
                        {Object.keys(user).filter(val => val !== "_id").map(el => (
                            <Form.Group key={el}>
                                <Form.Label>
                                    {el} :
                  </Form.Label>
                                <Form.Control onChange={onChange} defaultValue={user[el]} type={el === "email" ? "email" : "text"} name={el} />
                            </Form.Group>
                        ))}
                        <div style={{ textAlign: "right" }}>
                            <Button style={{ marginRight: "0.5rem" }} className="btn btn-success" onClick={saveChanges}>Save</Button>
                            <Button className="btn btn-danger" onClick={() => setModalShow(false)}>Cancel</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default Users;