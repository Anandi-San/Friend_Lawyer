import React, { useEffect, useState } from 'react';
import img from "../../img/foto.svg";
import { Link } from 'react-router-dom';
import axios from 'axios';

const KonsultasiLangsung = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    const mitraLawyerUsers = response.data.filter(user => user.role === 'Lawyer');
    setUsers(mitraLawyerUsers);
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
                  <ul>
                    <li>Kasus Penistaan Agama</li>
                    <li>Kasus Merendahkan Perumpuan</li>
                    <li>Kasus Mogok Kerja</li>
                  </ul>
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
