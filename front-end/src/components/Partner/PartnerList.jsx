import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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
          getPartners();
        }
      });
    };
  return (
    <div className='bg-[#1e252b] w-screen h-screen'>
        <h1 className='text-white text-3xl font-semibold'>Partner</h1>
     <h2 className='text-white text-xl font-semibold mb-4'> List of Partners</h2>
    <hr />
    <Link to="/partners/add" className='button is-primary mb-2'>Add new</Link>
     <table className='table is-striped is-fullwidth' style={{ backgroundColor: "#1e252b", color: "white", width: "90%"}}>
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
                  <p className='text-white'>Specialization</p>
                </th>
                <th>
                  <p className='text-white'>Experience</p>
                </th>
                <th>
                  <p className='text-white'>Education</p>
                </th>
                <th>
                  <p className='text-white'>License</p>
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
                <td className='bg-[#1e252b] text-white'>
                    {user.specialization.slice(1).map((specialization, index) => (
                        <React.Fragment key={index}>
                        {specialization.role_name}
                        {index !== user.specialization.length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </td>
                <td className='bg-[#1e252b] text-white'>
                {user.experience}
                </td>
                <td className='bg-[#1e252b] text-white'>{user.education}</td>
                <td className='bg-[#1e252b] text-white'>{user.license}</td>
                <td className='bg-[#1e252b] text-white'>
                <Link
                  to={`/partners/edit/${user.uuid}`}
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