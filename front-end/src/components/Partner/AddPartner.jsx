import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AddPartner() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [role, setRole] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [license, setLicense] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const addPartner = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/partners', {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
        specialization: specialization,
        experience: experience,
        education: education,
        license: license
      });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Partner added successfully!'
      });

      navigate('/partners');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add partner. Please try again.'
      });
    }
  };

  return (
    <div className='bg-[#1e252b] w-screen h-screen'>
      <h1 className='text-white text-3xl font-semibold'>Partners</h1>
      <h2 className='text-white text-xl font-semibold'>Add New Partner</h2>
      <hr />
      <div className="card shadow-none" style={{ background: "#1e252b" }}>
        <div className="card-content">
          <div className="content">
            <form onSubmit={addPartner}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">
                  <p className='text-white'>Nama</p>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan Nama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white"
                />
              </div>

              <div className="field">
                <label className="label">
                  <p className='text-white'>Email</p>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white"
                />
              </div>
              <div className="field">
                <label className="label">
                  <p className='text-white'>Password</p>
                </label>
                <input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white"
                />
              </div>
              <div className="field">
                <label className="label">
                  <p className='text-white'>Confirm</p>
                </label>
                <input
                  type="password"
                  placeholder="********"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white"
                />
              </div>
              <div className="field">
                <label className="label">
                  <p className='text-white'>Role</p>
                </label>
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600"
                  >
                    <option value="admin">Admin</option>
                    <option value="Lawyer">Lawyer</option>
                    <option value="User">User</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">
                  <p className='text-white'>Specialization</p>
                </label>
                <input
                  type="text"
                  placeholder="Specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white"
                />
              </div>
              <div className="field">
                <label className="label">
                  <p className='text-white'>Experience</p>
                </label>
                <input
                  type="text"
                  placeholder="Experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white"
                />
              </div>
              <div className="field">
                <label className="label">
                  <p className='text-white'>Education</p>
                </label>
                <input
                  type="text"
                  placeholder="Education"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white"
                />
              </div>
              <div className="field">
                <label className="label">
                  <p className='text-white'>License</p>
                </label>
                <input
                  type="text"
                  placeholder="License"
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white"
                />
              </div>
              <div className="mb-4">
                <button type="submit" className="button bg-green-500 text-white">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPartner;
