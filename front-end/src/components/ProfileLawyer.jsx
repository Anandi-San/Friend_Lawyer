import React, { useEffect, useState } from 'react';
import img from "../img/foto.svg";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../style/index.css'

const ProfileLawyer = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  console.log(id)

  useEffect(() => {
    const getPartner = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/partners/${id}`);
        setUser(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    };

    getPartner();
  }, [id]);

  const handleBooking = () => {
    window.location.href = `/booking/${id}`;
  };
  

  return (
    <div className="container landing-page">
      <section className="section">
        {/* <h2 className="title">Detail Pengacara</h2> */}
        {user && (
          <div className="card">
            <div className="card-image pt-5">
              <figure className="w-1/6 m-auto">
                <img src={img} alt="Layanan 1" className='' />
              </figure>
            </div>
            <div className="card-content flex flex-col">
              <h4 className="m-auto text-4xl font-semibold">{user.name}</h4>
              <h4 className="m-auto text-2xl text-slate-500 pb-5">PT. Panti Origin Lawyer Community</h4>

              <h5 className='text-xl font-semibold'>Specialization</h5>
              <ul className='text-lg ml-10 pb-2.5'>
                  {user.specialization && user.specialization.slice(1).map((specialization, index) => (
                      <React.Fragment key={index}>
                        <li className='list-disc'>
                          <h5>
                            {specialization.role_name}
                            {index !== user.specialization.length - 2 && <br />}
                          </h5>
                        </li>
                      </React.Fragment>
                    ))}
              </ul>
              <h5 className='text-xl font-semibold'>Experience</h5>
              <h5 className='text-lg ml-5 pb-2.5'>{user.experience}</h5>

              <h5 className='text-xl font-semibold'>Education</h5>
              <h5 className='text-lg ml-5 pb-2.5'>{user.education}</h5>

              <h5 className='text-xl font-semibold'>License</h5>
              <h5 className='text-lg ml-5 pb-2.5'>{user.license}</h5>
              <div className='w-full flex flex-row-reverse'>
                <button className='p-[12px_16px] w-[180px] border rounded-md bg-[#b56c55] font-semibold text-lg text-white' type='submit' onClick={handleBooking}>Daftar Konsultasi</button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default ProfileLawyer;
