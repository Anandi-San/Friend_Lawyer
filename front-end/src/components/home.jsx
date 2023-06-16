import React, {useState, useEffect} from "react";
// import service1 from "../img/service1.png";
// import step2 from "../img/step2.png"
import cover1 from "../img/cover1.png"
import cover2 from "../img/cover2.jpg"
import { Link } from "react-router-dom";
// import {AiFillMessage} from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {SiGooglechat} from "react-icons/si";
import {ImUserPlus} from "react-icons/im"
import {AiFillCopyrightCircle} from "react-icons/ai"

const Home = () => {
  const navigate = useNavigate();

  const handleJoinChat = () => {
    navigate("/discussionforum");
  };

  const daftarKonsultasi = () => {
    navigate("/DirectConsultationPage");
  };

  
    return (
      <div className="bg-[#1E252B]">
          <header className="bg-[#171C21]">
            {/* <Link to={`/notif/${id}`}>
              <AiFillMessage size={24} />
            </Link> */}
            <div className="hero-body">
              <div className="container">
                <div className="header-content flex items-center ">
                  <div className="w-3/4 mr-8">
                    <h1 className="text-white text-5xl font-bold mb-4 ml-2">Mengatasi Tantangan Hukum Anda dengan Bijaksana dan Berpengalaman!</h1>
                    <p className="text-gray-300 text-lg">Memberi Pengetahuan dan Membantu Kesuksesan Anda dalam Menghadapi Hukum, Memberi Kenyamanan Client dan Menjaga Rahasia Client</p>
                  </div>
                  <div className="w-1/2 flex justify-end">
                    <img src={cover1} alt="Logo" className="w-11/12" />
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 flex flex-col justify-center mr-10">
              <h2 className="text-4xl font-bold text-white ml-20 font-bold">About</h2>
              <h3 className="text-3xl mb-4 text-white ml-20">tentang aplikasi ini</h3>
              <p className="text-white text-2xl ml-20"> Selamat datang di platform kami yang inovatif, tempat di mana Anda dapat berpartisipasi dalam diskusi hukum yang menginspirasi dan mendapatkan konsultasi langsung dari para pengacara ahli.Kami berkomitmen untuk menciptakan komunitas yang saling mendukung, berbagi pengetahuan, dan memberikan solusi hukum yang tepat.</p>
            </div>
            <div className="md:w-1/2 flex items-center justify-center">
              <img src={cover2} alt="Cover Image" className="w-8/12 mt-20" />
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white text-center">Service</h2>
            <p className="text-white text-center text-2xl mb-12">Apa saja layanan kami:</p>
            <div className="mt-8 grid grid-cols-2 gap-2">
              <div className="bg-white p-4 w-3/4 mx-auto">
              <div className="border border-gray-500 p-4 ml-5 mt-5 w-32">
              <span className="text-gray-500 text-xl">
                <SiGooglechat className="text-black text-8xl"/>
              </span>
              </div>
              <div className="ml-4">
                <h3 className="text-3xl font-semibold mt-5 ml-2">Forum Diskusi</h3>
                <p className="text-gray-500 text-xl ml-2 mt-2">
                  Akses tempat berbagi pikiran tentang pasal-pasal yang berlaku di Indonesia. Saling terhubung antar pengguna dari berbagai tempat.
                </p>
            </div>
            <button className="bg-[#171C21] text-white text-lg px-14 py-2 rounded-full mt-5 ml-5" onClick={handleJoinChat}>Join Chat</button>
              </div>
              <div className="bg-white p-4 w-3/4 mx-auto ">
              <div className="border border-gray-500 p-4 ml-5 mt-5 w-32">
              <span className="text-gray-500 text-xl">
                <ImUserPlus className="text-black text-8xl"/>
              </span>
              </div>
              <div className="ml-4">
                <h3 className="text-3xl font-semibold mt-5 ml-2">Konsultasi dengan Pengacara</h3>
                <p className="text-gray-500 text-xl ml-2 mt-2">
                akses laman untuk dapat melakukan pendataran konsultasi dengan pengacara dengan memilih pengacara yang sesuai dengan kebutuhan anda
                </p>
            </div>
            <button className="bg-[#171C21] text-white text-lg px-14 py-2 rounded-full mt-5 ml-5" onClick={daftarKonsultasi}>Daftar Konsultasi</button>
              </div>
            </div>
          </div>
          <div className="mt-16 ">
            <hr className="border-b mx-auto w-11/12 " />
            <div className="flex items-center">
              <AiFillCopyrightCircle className="mr-2 ml-20 text-3xl text-white" />
              <p className="text-white">2023 FriendLawyer. All Rights reserved</p>
              <p className="ml-auto mr-20 text-white">Privacy policy</p>
            </div>
          </div>


    

           {/* <div className="container landing-page">
      <section className="section ">
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
          <p>Hak Cipta © 2023 LawyerFriend.com. Semua Hak Dilindungi.</p>
        </div>
      </footer> */}
    </div>
    // </div>
      
    );
  }
  
  export default Home