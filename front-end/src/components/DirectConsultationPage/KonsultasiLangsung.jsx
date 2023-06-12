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
};

  return (
    <div className="container landing-page">
      <section className="section">
        <h2 className="title">Daftar Pengacara Profesional</h2>
        <div className="columns">
          {users.map((user) => (
            <div className="column" key={user.uuid}>
              <div className="card">
                <div className="card-image">
                  <figure className="image">
                    <img src={img} alt="Layanan 1" />
                  </figure>
                </div>
                <div className="card-content">
                  <Link to={`/users/${user.uuid}`}>
                    <h4 className="title is-4">{user.name}</h4>
                  </Link>
                  <h4 className='text-gray-500 mt-4'>Kasus Kasus yang ditangani</h4>
                  <div>
                    {user.specialization && user.specialization.slice(1).map((specialization, index) => (
                      <React.Fragment key={index}>
                        {specialization.role_name}
                        {index !== user.specialization.length - 2 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default KonsultasiLangsung;
