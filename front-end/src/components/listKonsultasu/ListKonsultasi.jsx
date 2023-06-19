import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';


function ListKonsultasi() {
const [forms, setForms] = useState([]);
const [accepted, setAccepted] = useState([]);
const [rejected, setRejected] = useState([]);

useEffect(()=>{
    getforms();
},[]);

const getforms = async () => {
    if (JSON.parse(localStorage.getItem('user')).role === "admin") {
        const response = await axios.get(`http://localhost:5000/form`);
        setForms(response.data);
    } else {
        const response = await axios.get(`http://localhost:5000/form/${JSON.parse(localStorage.getItem('user')).uuid}`);
        setForms(response.data);
    }
};

const deleteforms = async (formconsultantId) => {
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
      await axios.delete(`http://localhost:5000/form/${formconsultantId}`);
      Swal.fire({
        icon: 'success',
        title: 'Form Deleted',
        showConfirmButton: false,
        timer: 1500,
      });
      getforms();
    }
  });
};


const acceptForm = async (formconsultantId) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to accept this form.',
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Accept',
  }).then(async (result) => {
    if (result.isConfirmed) {
      await axios.patch(`http://localhost:5000/form/${formconsultantId}`, { status: 'accepted' });
      setAccepted([...accepted, formconsultantId]);
      Swal.fire({
        icon: 'success',
        title: 'Form Accepted',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
};

  const rejectForm = async (formconsultantId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to reject this form.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Reject',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch(`http://localhost:5000/form/${formconsultantId}`, { status: 'rejected' });
        setRejected([...rejected, formconsultantId]);
        Swal.fire({
          icon: 'success',
          title: 'Form Rejected',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  
  

  return (
    <div className='bg-[#1e252b] w-screen h-screen'>
    <h1 className='text-white text-3xl font-semibold'>consultation</h1>
    <h2 className='text-white text-xl font-semibold mb-4'>List of consultationt</h2>
        <table className='table is-striped' style={{ backgroundColor: "#1e252b", color: "white", width: "90%"}}>
            <thead>
                <tr>
                    <th>
                      <p className='text-white'>No</p>
                    </th>
                    <th>
                      <p className='text-white'>Full Name</p>
                    </th>
                    <th>
                      <p className='text-white'>Email</p>                    
                    </th>
                    <th>
                    <p className='text-white'>Phone Number</p>
                    </th>
                    <th>
                    <p className='text-white'>Day</p>
                    </th>
                    <th>
                      <p className='text-white'>Hours</p>
                    </th>
                    <th>
                      <p className='text-white'>Problem</p>
                    </th>
                    <th>
                      <p className='text-white'>Action</p>
                    </th>
                </tr>
            </thead>
            <tbody>
                {forms.map((formconsultant, index) => (
                      <tr className='bg-[#1e252b] text-white' key={formconsultant.uuid}>
                      <td className='bg-[#1e252b] text-white'>{index + 1}</td>
                      <td className='bg-[#1e252b] text-white'>{formconsultant.full_name}</td>
                      <td className='bg-[#1e252b] text-white'>{formconsultant.email}</td>
                      <td className='bg-[#1e252b] text-white'>{formconsultant.phonenumber}</td>
                      <td className='bg-[#1e252b] text-white'>{formconsultant.day}</td>
                      <td className='bg-[#1e252b] text-white'>{formconsultant.hours}</td>
                      <td className='bg-[#1e252b] text-white'> {formconsultant.problem}</td>
                      <td className='bg-[#1e252b] text-white'> 
                        <button
                            className={`button is-small is-info ${accepted.includes(formconsultant.uuid) ? 'disabled' : ''}`}
                            onClick={() => acceptForm(formconsultant.uuid)}>Accept
                        </button>
                        <button
                            className={`button is-small is-danger ${rejected.includes(formconsultant.uuid) ? 'disabled' : ''}`}
                            onClick={() => rejectForm(formconsultant.uuid)}>Reject
                            </button>
                        <button onClick={() => deleteforms(formconsultant.uuid)} className='button is-small is-danger'>Delete</button>
                      </td>
                  </tr>
                ))}
            </tbody>
        </table>
     </div>
  );
};

export default ListKonsultasi