import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

const Discussionlist = () => {
    const [discussions, setDiscussions] = useState([]);


    useEffect(()=>{
        getDiscussions();
    },[]);

    const getDiscussions = async () => {
        const response = await axios.get("http://localhost:5000/discussion");
        setDiscussions(response.data);
    };

    const deleteDiscussion = async (discussionId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
          }).then(async (result) => {
            if (result.isConfirmed) {
              await axios.delete(`http://localhost:5000/discussion/${discussionId}`);
              Swal.fire({
                icon: 'success',
                title: 'Discussion Deleted',
                showConfirmButton: false,
                timer: 1500,
              });
              getDiscussions();
            }
          });
        };

  return (
    <div className='bg-[#1e252b] h-screen'>
    <h1 className='text-white text-3xl font-semibold'>Discussion</h1>
    <h2 className='text-white text-xl font-semibold mb-4'>List of Discussion</h2>
    <Link to="/discussion/add" className='button is-primary mb-2'>Add new</Link>
        <table className='table is-striped is-fullwidth' style={{ backgroundColor: "#1e252b", color: "white" }}>
            <thead>
                <tr>
                    <th>
                        <p className='text-white'>No</p>
                    </th>
                    <th>
                        <p className='text-white'>title</p>
                    </th>
                    <th>
                        <p className='text-white'>Content</p>
                    </th>
                    <th>
                        <p className='text-white'>createdBy</p>
                    </th>
                    <th>
                        <p className='text-white'>Action</p>
                    </th>
                </tr>
            </thead>
            <tbody>
                {discussions.map((discussion, index) => (
                      <tr className='bg-[#1e252b] text-white' key={discussion.uuid}>
                      <td className='bg-[#1e252b] text-white'>{index + 1}</td>
                      <td className='bg-[#1e252b] text-white'>{discussion.title}</td>
                      <td className='bg-[#1e252b] text-white'>{discussion.content}</td>
                      <td className='bg-[#1e252b] text-white'>{discussion.user.name}</td>
                      <td className='bg-[#1e252b] text-white'>
                        <Link to = {`/discussion/edit/${discussion.uuid}`} className='button is-small is-info' >Edit</Link>
                        <button onClick={() => deleteDiscussion(discussion.uuid)} className='button is-small is-danger' >delete</button>
                      </td>
                  </tr>
                ))}
            </tbody>
        </table>
     </div>
  );
};

export default Discussionlist