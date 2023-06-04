import React, { useEffect, useState } from 'react';
import img from "../img/foto.svg";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfileLawyer = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      setUser(response.data);
    };

    getUser();
  }, [id]);

  return (
    <div className="container landing-page">
      <section className="section">
        {user ? (
          <>
            <h2 className="title">Detail Pengacara</h2>
            <div className="card">
              <div className="card-image">
                <figure className="image">
                  <img src={img} alt="Layanan 1" />
                </figure>
              </div>
              <div className="card-content">
                <h4 className="title is-4">{user.name}</h4>
                <h5>specialization</h5>
                <h5>experience</h5>
                <h5>education</h5>
                <h5>license</h5> 
                <button>Daftar Konsultasi</button>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </div>
  );
}

export default ProfileLawyer;
