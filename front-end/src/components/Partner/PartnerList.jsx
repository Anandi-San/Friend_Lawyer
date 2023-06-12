import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Userlist = () => {
    const [users, setUsers] = useState([]);


    useEffect(()=>{
        getPartners();
    },[]);

    const getPartners = async () => {
        const response = await axios.get("http://localhost:5000/partners");
        setUsers(response.data);
        console.log(response.data)
    };

    const deleteUser = async (userId) => {
        await axios.delete(`http://localhost:5000/users/${userId}`);
        getPartners();
    };
  return (
    <div>
        <h1 className='title'>Partner</h1>
     <h2 className='subtitle'> List of Partners</h2>
    <Link to="/partners/add" className='button is-primary mb-2'>Add new</Link>
     <table className='table is-striped is-fullwidth'>
        <thead>
            <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>specialization</th>
                <th>experience</th>
                <th>education</th>
                <th>license</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user, index)=>(
              <tr key={user.uuid}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                    {user.specialization.slice(1).map((specialization, index) => (
                        <React.Fragment key={index}>
                        {specialization.role_name}
                        {index !== user.specialization.length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </td>
                <td>
                {user.experience}
                </td>
                <td>{user.education}</td>
                <td>{user.license}</td>
                <td>
                <Link
                  to={`/users/edit/${user.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button> 
                </td>
              </tr>   
            ))}
        </tbody>
     </table>
    </div>
  )
}

export default Userlist