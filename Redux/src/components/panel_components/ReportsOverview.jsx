// import React, { useState, useEffect } from 'react';
// import { Form, Button, Modal, Table } from 'react-bootstrap';
// import { Icon, Popconfirm } from 'antd';
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOverviewReports } from '../../actions/OverviewReportsAction';
// import jwt from 'jwt-decode';

// function ReportsOverview(props) {
//   const userInfo = jwt(localStorage.getItem("jwt"));

//   const [reportsModal, showReportsModal] = useState(false);

//   const dispatch = useDispatch();
//   const results = useSelector(state => state);

//   console.log(`results `, results);

//   useEffect(() => {
//     dispatch(fetchOverviewReports());
//   }, []);  

//   return (
//     <div>
//       {/* {results.ReportsOverviewReducer.loading ? (
//         "Loading..."
//       ) : results.ReportsOverviewReducer.reports.length && <Table responsive>
//         <thead>
//           <tr>
//             {Object.keys(results.ReportsOverviewReducer.reports[0]).map(el => (
//               <th key={el}>{el}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {results.ReportsOverviewReducer.reports.map(el => (
//             <tr key={el.name}>
//               <td>{el.name}</td>
//               <td>{el.description}</td>
//               <td>{el.estimation}</td>
//               <td>{el.spent}</td>
//               <td>
//                 <Popconfirm
//                   title="Are you sure you want to delete this user?"
//                   placement="left"
//                   onConfirm={() => dispatch(deleteReport(el))}
//                   okText="Yes"
//                   cancelText="No"
//                 >
//                   <Icon type="delete" style={{ color: 'red', marginRight: "0.5rem" }} />
//                 </Popconfirm>
//                 <Icon type="edit" style={{ color: "#e6e600" }} onClick={} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>}
//       <Button onClick={showModal}>Add Report</Button>
//       <Modal
//         show={results.ReportsOverviewReducer.showModal}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//         onHide={() => dispatch({ type: "CANCEL_EDIT_REPORT" })}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="contained-modal-title-vcenter">
//             Adding report
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form style={{ width: "100%", padding: "0 0.5rem" }}>
//             {Object.keys(report).filter(value => value !== "id").map(el => (
//               <Form.Group key={el}>
//                 <Form.Label>
//                   {el} :
//                 </Form.Label>
//                 {el !== "description" ? <Form.Control onChange={onChange} defaultValue={report[el]} type={el === "name" ? "text" : "number"} name={el} /> : <Form.Control onChange={onChange} as="textarea" style={{ resize: 'none', height: '150px' }} name={el} defaultValue={report[el]} />}
//               </Form.Group>
//             ))}
//             <div style={{ textAlign: "right" }}>
//               <Button style={{ marginRight: "0.5rem" }} className="btn btn-success" onClick={() => dispatch(saveChanges(report, results.ReportsOverviewReducer.reports))}>Save</Button>
//               <Button className="btn btn-danger" onClick={() => dispatch({ type: "CANCEL_EDIT_REPORT" })}>Cancel</Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal> */}
//       <Modal
//         show={reportsModal}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//         onHide={() => dispatch({ type: "CANCEL_EDIT_REPORT" })}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="contained-modal-title-vcenter">
//             Adding report
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form style={{ width: "100%", padding: "0 0.5rem" }}>
//             {Object.keys(report).filter(value => value !== "id").map(el => (
//               <Form.Group key={el}>
//                 <Form.Label>
//                   {el} :
//                 </Form.Label>
//                 {el !== "description" ? <Form.Control onChange={onChange} defaultValue={report[el]} type={el === "name" ? "text" : "number"} name={el} /> : <Form.Control onChange={onChange} as="textarea" style={{ resize: 'none', height: '150px' }} name={el} defaultValue={report[el]} />}
//               </Form.Group>
//             ))}
//             <div style={{ textAlign: "right" }}>
//               <Button style={{ marginRight: "0.5rem" }} className="btn btn-success" onClick={() => dispatch(saveChanges(report, results.reportsReducer.reports))}>Save</Button>
//               <Button className="btn btn-danger" onClick={() => dispatch({ type: "CANCEL_EDIT_REPORT" })}>Cancel</Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   )
// }

// export default ReportsOverview;
