import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

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

    
       
      return (
        <div className='bg-[#1e252b] w-screen h-screen'>
        <h1 className='text-white text-3xl font-semibold'>consultation</h1>
        <h2 className='text-white text-xl font-semibold mb-4'>List of status Consultation</h2>
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
                            <p className='text-white'>Day</p>
                        </th>
                        <th>
                            <p className='text-white'>Hours</p>
                        </th>
                        <th>
                            <p className='text-white'>Problem</p>
                        </th>
                        <th>
                            <p className='text-white'>Status</p>
                        </th>
                        <th>
                            <p className='text-white'>Action</p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {forms.map((formconsultant, index) => {
                        if (formconsultant.status === 'accepted' || formconsultant.status === 'rejected' || formconsultant.status === 'canceled') {
                            return (
                                <tr className='bg-[#1e252b] text-white' key={formconsultant.uuid}>
                                    <td className='bg-[#1e252b] text-white'>{index + 1}</td>
                                    <td className='bg-[#1e252b] text-white'>{formconsultant.full_name}</td>
                                    <td className='bg-[#1e252b] text-white'>{formconsultant.day}</td>
                                    <td className='bg-[#1e252b] text-white'>{formconsultant.hours}</td>
                                    <td className='bg-[#1e252b] text-white'>{formconsultant.problem}</td>
                                    <td className='bg-[#1e252b] text-white'>{formconsultant.status}</td>
                                    <td className='bg-[#1e252b] text-white'>
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