import React, { useState, useEffect } from 'react'
import axios from 'axios';


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
    const userRole = JSON.parse(localStorage.getItem('user')).role;
    if (userRole === 'admin' || userRole === 'Lawyer') {
      await axios.delete(`http://localhost:5000/form/${formconsultantId}`);
      getforms();
    } else {
    }
  };


const acceptForm = async (formconsultantId) => {
    await axios.patch(`http://localhost:5000/form/${formconsultantId}`, { status: "accepted" });
    setAccepted([...accepted, formconsultantId]);
  };

  const rejectForm = async (formconsultantId) => {
    await axios.patch(`http://localhost:5000/form/${formconsultantId}`, { status: "rejected" });
    setRejected([...rejected, formconsultantId]);
  };
  
  

  return (
    <div>
    <h1 className='title'>consultation</h1>
    <h2 className='subtitle'>List of consultationt</h2>
        <table className='table is-striped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Full Name</th>
                    <th>Email </th>
                    <th>Phone Number</th>
                    <th>Day</th>
                    <th>Hours</th>
                    <th>Problem</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {forms.map((formconsultant, index) => (
                      <tr key={formconsultant.uuid}>
                      <td>{index + 1}</td>
                      <td>{formconsultant.full_name}</td>
                      <td>{formconsultant.email}</td>
                      <td>{formconsultant.phonenumber}</td>
                      <td>{formconsultant.day}</td>
                      <td>{formconsultant.hours}</td>
                      <td>{formconsultant.problem}</td>
                      <td>
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