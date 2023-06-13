import React, {useState, useEffect} from "react";
import service1 from "../img/service1.png";
import step2 from "../img/step2.png"
import banner1 from "../img/banner1.jpg"
import { Link, useParams } from "react-router-dom";
import {AiFillMessage} from "react-icons/ai";
import axios from "axios";
// import { useParams } from "react-router-dom";


const Home = () => {
  const [user, setUsers] = useState([]);

  const saved = JSON.parse(localStorage.getItem("user"));
  const id = saved.uuid;

  useEffect(()=>{
      getUserById();
  },[]);
  
  const getUserById = async () => {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      // setUsers(response.data);
      // console.log(response.data)
  };

  
    return (
      <div>
          <style>
          {`
        .hero.is-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 70vh;
          background-image: url(${banner1});
          background-size: cover;
          background-position: center;
        }

        .header-content {
          text-align: center;
          color: white;
        }
        `}
      </style>
      <header className="hero is-primary">
      <Link to={`/notif/${id}`}>
        <AiFillMessage size={24} />
      </Link>
      <div className="hero-body">
      <div className="container">
      <div className="header-content">
      {/* <img src={banner1} alt="Logo" className="banner-image" /> */}
        <h1 className="title">Friend Lawyer Pembantu permasalahan hukum Anda</h1>
        <p className="subtitle">Solusi Hukum Profesional untuk Kebutuhan Anda</p>
      </div>
      </div>
      </div>
    </header>
           <div className="container landing-page">
      <section className="section">
        <h2 className="title">Layanan Kami</h2>
        <div className="columns">
          <div className="column">
            <div className="card">
              <div className="card-image">
                <figure className="image">
                  <img src={service1} alt="Layanan 1" />
                </figure>
              </div>
              <div className="card-content">
               <Link to="/discussionforum" className="title is-4">Layanan 1</Link> 
                <p>Diskusi bersama tentang hukum</p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <div className="card-image">
                <figure className="image">
                  <img src={service1} alt="Layanan 2" />
                </figure>
              </div>
              <div className="card-content">
              <Link to="/ChatConsultationPage" className="title is-4"> Layanan 2</Link> 
                <p>Konsultasi dengan profesional Bot</p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <div className="card-image">
                <figure className="image">
                  <img src={service1} alt="Layanan 3" />
                </figure>
              </div>
              <div className="card-content">
              <Link to="/DirectConsultationPage" className="title is-4"> Layanan 3</Link> 
                <p>Konsultasi secara langsung atau tatap muka dengan lawyer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <h2 className="title">Cara Kerja</h2>
        <div className="columns">
          <div className="column">
            <div className="box">
              <img src={step2} alt="Langkah 1" />
              <h3 className="title is-5">Langkah 1</h3>
              <p>Deskripsi langkah 1.</p>
            </div>
          </div>
          <div className="column">
            <div className="box">
              <img src={step2} alt="Langkah 2" />
              <h3 className="title is-5">Langkah 2</h3>
              <p>Deskripsi langkah 2.</p>
            </div>
          </div>
          <div className="column">
            <div className="box">
              <img src={step2} alt="Langkah 3" />
              <h3 className="title is-5">Langkah 3</h3>
              <p>Deskripsi langkah 3.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <h2 className="title">Hubungi Kami</h2>
        <p>Jika Anda memiliki pertanyaan atau ingin menggunakan jasa pengacara kami, silakan hubungi kami di:</p>
        <p>Email: info@pengacara.com</p>
        <p>Telepon: 123-456-7890</p>
      </section>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>Hak Cipta © 2023 Pengacara.com. Semua Hak Dilindungi.</p>
        </div>
      </footer>
    </div>
    </div>
      
    );
  }
  
  export default Home