import React, { useEffect, useState } from 'react';
import img from '../img/foto.svg';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfileLawyer = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    const getPartner = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/partners/${id}`);
        setUser(response.data);
        // console.log(response.data);
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
    <div className='bg-[#1E252B] min-h-screen'>
    <div className="container mx-auto px-4">
      <section className="pt-5">
        {user && (
          <div className="max-w-3xl mx-auto bg-[#262D34] text-white rounded-lg shadow-md overflow-hidden">
            <div className="py-5">
              <figure className="w-1/6 m-auto">
                <img src={img} alt="Layanan 1" className="" />
              </figure>
            </div>
            <div className="px-6 py-4">
              <h4 className="text-4xl font-semibold text-center mb-4">{user.name}</h4>
              <h4 className="text-2xl text-center text-gray-500 pb-5">PT. Panti Origin Lawyer Community</h4>

              <h5 className="text-xl font-semibold">Specialization</h5>
              <ul className="text-lg ml-10 pb-2.5">
                {user.specialization &&
                  user.specialization.slice(1).map((specialization, index) => (
                    <React.Fragment key={index}>
                      <li className="list-disc">
                        <h5>
                          {specialization.role_name}
                          {index !== user.specialization.length - 2 && <br />}
                        </h5>
                      </li>
                    </React.Fragment>
                  ))}
              </ul>

              <h5 className="text-xl font-semibold">Experience</h5>
              <h5 className="text-lg ml-5 pb-2.5">{user.experience}</h5>

              <h5 className="text-xl font-semibold">Education</h5>
              <h5 className="text-lg ml-5 pb-2.5">{user.education}</h5>

              <h5 className="text-xl font-semibold">License</h5>
              <h5 className="text-lg ml-5 pb-2.5">{user.license}</h5>
            </div>
            <div className="flex justify-end py-4 px-6">
              <button
                className="px-4 py-2 border rounded-md bg-[#1E252B] font-semibold text-lg text-white"
                type="submit"
                onClick={handleBooking}
              >
                Daftar Konsultasi
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
    </div>
  );
};

export default ProfileLawyer;
