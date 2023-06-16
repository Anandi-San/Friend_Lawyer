import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Mymessage() {
  const [forms, setForms] = useState([]);
  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    getFormsByUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFormsByUserId = async () => {
    const response = await axios.get(`http://localhost:5000/notif/${id}`);
    setForms(response.data);
    // console.log(response.data);
  };

  return (
    <div className="bg-[#1E252B] min-h-screen p-8">
      <h1 className="text-white text-2xl font-bold mb-4">Consultation</h1>
      <h2 className="text-white text-lg font-semibold mb-4">Daftar Permintaan Konsultasi Anda</h2>
      <table className="table-auto w-full bg-[#262D34] text-white text-left">
        <thead>
          <tr>
            <th className="px-4 py-2 text-white">No</th>
            <th className="px-4 py-2 text-white">Nama Lawyer</th>
            <th className="px-4 py-2 text-white">Day</th>
            <th className="px-4 py-2 text-white">Hours</th>
            <th className="px-4 py-2 text-white">status</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((formconsultant, index) => (
            <tr key={formconsultant.uuid}>
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{formconsultant.lawyer.name}</td>
              <td className="px-4 py-2">{formconsultant.day}</td>
              <td className="px-4 py-2">{formconsultant.hours}</td>
              <td className="px-4 py-2">{formconsultant.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Mymessage;
