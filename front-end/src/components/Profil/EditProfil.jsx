import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function EditProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [license, setLicense] = useState('');
  const [msg, setMsg] = useState('');
  const [role, setRole] = useState('Lawyer');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getPartnersById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/partners/${id}`);
        const { name, email, specialization, experience, education, license, role } = response.data;
        setName(name);
        setEmail(email);
        setSpecialization(specialization);
        setExperience(experience);
        setEducation(education);
        setLicense(license);
        setRole(role);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getPartnersById();
  }, [id]);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/profil/update/${id}`, {
        name: name,
        email: email,
        specialization: specialization,
        experience: experience,
        education: education,
        license: license,
      });
      Swal.fire({
        icon: 'success',
        title: 'Update Successful',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate(`/users/${id}`);
      });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'An error occurred while updating the profile.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#262D34] text-white">
      <h1 className="text-2xl font-bold ml-4">PROFILE</h1>
      <h2 className="text-xl font-bold ml-4">Edit Profile</h2>
      <div className="  card bg-[#1E252B]">
        <div className="bg-[#1E252B]">
          <div className="content text-white">
            <form onSubmit={updateProfile}>
              <p className="text-center">{msg}</p>
              {role === 'Lawyer' ? (
                <>
                  <div className="mb-4">
                    <label className="block ml-4">Name</label>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className='lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white ml-4'
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block ml-4">Email</label>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white ml-4'
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block ml-4">Specialization (inputkan dengan data1, data2, data3)</label>
                    <input
                      type="text"
                      placeholder="Enter Specialization"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      className='lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white ml-4'
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block ml-4">Experience</label>
                    <input
                      type="text"
                      placeholder="Enter Experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className='lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white ml-4'
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block ml-4">Education</label>
                    <input
                      type="text"
                      placeholder="Enter Education"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      className='lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white ml-4'
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block ml-4">License</label>
                    <input
                      type="text"
                      placeholder="Enter License"
                      value={license}
                      onChange={(e) => setLicense(e.target.value)}
                      className='lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white ml-4'
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block ml-4">Nama</label>
                    <input
                      type="text"
                      placeholder="Masukkan Nama"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className='lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white ml-4'
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block ml-4">Email</label>
                    <input
                      type="text"
                      placeholder="Masukkan Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white ml-4'
                    />
                  </div>
                </>
              )}

              <div className="flex flex-col w-full mt-4">
              <button
                className="p-[12px_16px] w-[140px] border rounded-md bg-[#1E252B] font-semibold text-lg text-white ml-4"
                type="submit"
              >
                Update
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
