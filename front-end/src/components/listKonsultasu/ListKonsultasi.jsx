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
    const response = await axios.get("http://localhost:5000/form");
    setForms(response.data);
    console.log(response.data)
};

const deleteforms = async (formculstantId) => {
    await axios.delete(`http://localhost:5000/form/${formculstantId}`);
    getforms();
};

const acceptForm = async (formconsultantId) => {
    await axios.post("http://localhost:5000/notification", { formId: formconsultantId, status: "accepted" });
    // Perbarui state acceptedForms dengan formconsultantId yang diterima
    setAccepted([...acceptForm, formconsultantId]);
  };

  const rejectForm = async (formconsultantId) => {
    // Kirim permintaan POST untuk menambahkan notifikasi pengguna yang ditolak
    await axios.post("http://localhost:5000/notification", { formId: formconsultantId, status: "rejected" });
    // Perbarui state rejectedForms dengan formconsultantId yang ditolak
    setRejected([...rejectForm, formconsultantId]);
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
                            onClick={() => acceptForm(formconsultant.uuid)}>Accepted
                    </button>
                    <button
                        className={`button is-small is-danger ${rejected.includes(formconsultant.uuid) ? 'disabled' : ''}`}
                        onClick={() => rejectForm(formconsultant.uuid)}
                        >
                        Reject
                        </button>
                        <button onClick={() => deleteforms(formconsultant.uuid)} className='button is-small is-danger' >Delete</button>
                      </td>
                  </tr>
                ))}
            </tbody>
        </table>
     </div>
  );
};

export default ListKonsultasi