import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      navigate('/partners');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Users</h1>
      <h2 className="text-xl font-semibold">Add New User</h2>
      <div className="card shadow-none">
        <div className="card-content">
          <div className="content">
            <form onSubmit={addPartner}>
              <p className="text-center">{msg}</p>
              <div className="mb-4">
                <label className="block text-sm font-medium">Nama</label>
                <input
                  type="text"
                  placeholder="Masukkan Nama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="text"
                  placeholder="Masukkan Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Confirm</label>
                <input
                  type="password"
                  placeholder="********"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  className="input"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Role</label>
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="input"
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
              <div className="mb-4">
                <label className="block text-sm font-medium">Specialization</label>
                <input
                  type="text"
                  placeholder="Specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="input"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Experience</label>
                <input
                  type="text"
                  placeholder="Experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="input"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Education</label>
                <input
                  type="text"
                  placeholder="Education"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="input"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">License</label>
                <input
                  type="text"
                  placeholder="License"
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  className="input"
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
