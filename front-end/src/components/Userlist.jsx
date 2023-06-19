import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Userlist = () => {
    const [users, setUsers] = useState([]);


    useEffect(()=>{
        getUsers();
    },[]);

    const getUsers = async () => {
        const response = await axios.get("http://localhost:5000/users");
        setUsers(response.data);
        // console.log(response.data)
    };

    const deleteUser = async (userId) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`http://localhost:5000/users/${userId}`);
          Swal.fire({
            icon: 'success',
            title: 'User Deleted',
            showConfirmButton: false,
            timer: 1500,
          });
          getUsers();
        }
      });
    };
  return (
    <div className='bg-[#1e252b] w-screen h-screen'>
        <h1 className='text-white text-3xl font-semibold'>Users</h1>
     <h2 className='text-white text-xl font-semibold mb-4'> List of Users</h2>
    <Link to="/users/add" className='button is-primary mb-2'>Add new</Link>
     <table className='table is-striped is-fullwidth' style={{ backgroundColor: "#1e252b", color: "white" }}>
        <thead>
            <tr>
                <th>
                  <p className='text-white'>No</p>
                </th>
                <th>
                  <p className='text-white'>Name</p>
                </th>
                <th>
                  <p className='text-white'>Email</p>
                </th>
                <th>
                  <p className='text-white'>Role</p>
                </th>
                <th>
                  <p className='text-white'>Actions</p>
                </th>
            </tr>
        </thead>
        <tbody>
            {users.map((user, index)=>(
              <tr className='bg-[#1e252b] text-white' key={user.uuid}>
                <td className='bg-[#1e252b] text-white'>{index + 1}</td>
                <td className='bg-[#1e252b] text-white'>{user.name}</td>
                <td className='bg-[#1e252b] text-white'>{user.email}</td>
                <td className='bg-[#1e252b] text-white'>{user.role}</td>
                <td className='bg-[#1e252b] text-white'>
                <Link
                  to={`/users/edit/${user.uuid}`}
                  className="button is-small is-info mb-2 mr-2"
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