import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Mymessage() {    
    const [forms, setForms] = useState([]);
    const { id } = useParams();
    console.log(id)

    useEffect(()=>{
        getformsByUserId();
    },[]);
    
    const getformsByUserId = async () => {
        const response = await axios.get(`http://localhost:5000/notif/${id}`);
        setForms(response.data);
        console.log(response.data)
    };

  return (
    <div>
        <h1 className='title'>consultation</h1>
        <h2 className='subtitle'>Daftar Permintaan Konsultasi Anda</h2>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Lawyer</th>
                        <th>Day</th>
                        <th>Hours</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                     {forms.map((formconsultant, index) => (
                      <tr key={formconsultant.uuid}>
                      <td>{index + 1}</td>
                      <td>{formconsultant.lawyer.name}</td>
                      <td>{formconsultant.day}</td>
                      <td>{formconsultant.hours}</td>
                      <td>{formconsultant.status}</td>
                  </tr>
                ))}
                </tbody>
            </table>
         </div>
      );
    };
export default Mymessage