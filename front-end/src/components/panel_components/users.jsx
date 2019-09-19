// import React, { useState, useEffect } from 'react';
// import { Tab, Row, Col, Table } from 'react-bootstrap';
// import axios from 'axios';

// function Users() {
//     const [users, setUsers] = useState({});
//     const xxx = [
//         {
//             "_id": "5d807fcd4e416b15208647ff",
//             "name": "sakulik",
//             "email": "gago@mail.ru",
//             "password": "$2b$10$nCQs8po2y/SPAM.ieyQeMua8x/dDLrizleLDP4Kqrrk6w5qWpfVbi",
//             "role": "developer",
//             "__v": 0
//         },
//         {
//             "_id": "5d80922b0f3e1e1d6429033b",
//             "name": "vzgulik",
//             "email": "vzgo@mail.ru",
//             "password": "$2b$10$EcpNJsn3W0sXz3FBiNbl7OdnCXSHkWct2EUPc/qO6VaL2hRTOOqfa",
//             "role": "developer",
//             "__v": 0
//         }
//     ]

//     // useEffect(() => {
//     //     axios.get('http://localhost:4000/api/getUsers')
//     //         .then(function (response) {
//     //             console.log(response.data);
//     //             setUsers(response.data)
//     //         })
//     //         .catch(function (error) {
//     //             console.log(error);
//     //         });
//     // }, [users])

//     useEffect(async () => {
//         const result = await axios(
//           'http://localhost:4000/api/getUsers',
//         );
//         setUsers(result.data);
//       }, []);

//     return (
//         <Table responsive>
//             <thead>
//                 <tr>
//                 {Object.keys(users[0]).map( el => (
//                     // console.log(Object.keys(xxx[0]));
//                     <th>{el}</th>
//                 ))}
//                 </tr>
//             </thead>
//             <tbody>
                            
//                 {/* <tr>
//                     <td>1</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                 </tr>
//                 <tr>
//                     <td>2</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                 </tr>
//                 <tr>
//                     <td>3</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                 </tr> */}
//             </tbody>
//         </Table>
//     )
// }


// export default Users;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
  const [data, setData] = useState({ hits: [] });
  useEffect(async () => {
    const result = await axios(
      'https://hn.algolia.com/api/v1/search?query=redux',
    );
    console.log(result)
    setData(result.data);
  }, []);
  return (
    <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}
export default App;