import React, { useEffect, useState } from 'react';
import img from "../../img/foto.svg";
import { Link } from 'react-router-dom';
import axios from 'axios';

const KonsultasiLangsung = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getPartners();
  }, []);

  const getPartners = async () => {
    const response = await axios.get("http://localhost:5000/partners");
    setUsers(response.data);
    // console.log(response.data)
};

  return (
    <div className='bg-[#1E252B] min-h-screen'>
    <div className="container mx-auto px-4">
      <section className="py-8">
        <h2 className="text-2xl font-bold  text-white mb-4">Daftar Pengacara Profesional</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
          {users.map((user) => (
            <div className="border border-white rounded-lg shadow-lg text-white bg-[#262D34]" key={user.uuid}>
              <div className="relative">
                <img className="w-full h-auto object-cover object-center" src={img} alt="Layanan 1" />
              </div>
              <div className="p-4">
                  <h4 className="text-xl font-bold mb-2 text-center">{user.name}</h4>
                <h4 className="text-gray-500 mb-4">Kasus Kasus yang ditangani</h4>
                <div>
                  {user.specialization && user.specialization.slice(1).map((specialization, index) => (
                    <React.Fragment key={index}>
                      {specialization.role_name}
                      {index !== user.specialization.length - 2 && <br />}
                    </React.Fragment>
                  ))}
                </div>
                <Link to={`/lawyers/${user.uuid}`}>
                <button className='p-2 border rounded-md bg-[#1E252B] font-semibold text-lg text-white mt-2'>Profile Lawyer</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    </div>
  );
}

export default KonsultasiLangsung;
