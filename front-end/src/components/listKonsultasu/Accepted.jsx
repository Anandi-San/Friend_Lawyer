import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

function Accepted() {
    const [forms, setForms] = useState([]);    
    
    
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
    
    const deleteforms = async (formculstantId) => {
        await axios.delete(`http://localhost:5000/form/${formculstantId}`);
        getforms();
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
                        <th>Day</th>
                        <th>Hours</th>
                        <th>Problem</th>
                        <th>status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {forms.map((formconsultant, index) => {
                        if (formconsultant.status === 'accepted' || formconsultant.status === 'rejected') {
                            return (
                                <tr key={formconsultant.uuid}>
                                    <td>{index + 1}</td>
                                    <td>{formconsultant.full_name}</td>
                                    <td>{formconsultant.day}</td>
                                    <td>{formconsultant.hours}</td>
                                    <td>{formconsultant.problem}</td>
                                    <td>{formconsultant.status}</td>
                                    <td>
                                        <button onClick={() => deleteforms(formconsultant.uuid)} className='button is-small is-danger' >Delete</button>
                                    </td>
                                </tr>
                            );
                        }
                        return null;
                    })}
                </tbody>
            </table>
         </div>
      );
    };

export default Accepted