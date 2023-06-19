import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function EditPartners() {
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
  const { id } = useParams();

  useEffect(() => {
    const getPartnersById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/partners/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setRole(response.data.role);
        setSpecialization(response.data.specialization);
        setExperience(response.data.experience);
        setEducation(response.data.education);
        setLicense(response.data.license);
        console.log(response.data.name)
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getPartnersById();
  }, [id]);

  const updatePartners = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/partners/${id}`, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
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
      });
      navigate('/partners');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update partner. Please try again.'
        });
      }
    };

  return (
    <div className='bg-[#1e252b] w-screen h-screen'>
      <h1 className='text-white text-3xl font-semibold'>Partner</h1>
      <h2 className='text-white text-xl font-semibold'>Edit Discussion</h2>
      <div className="card is-shadowless"  style={{ background: "#1e252b" }}>
        <div className="card-content">
          <div className="content">
            <form onSubmit={updatePartners}>
              <p className="has-text-center">{msg}</p>
              <div className="field">
                <label className="label">
                  <p className='text-white'>Name</p>
                </label>
                <div className="control">
                  <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">
                  <p className='text-white'>Email</p>
                </label>
                <div className="control">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">
                  <p className='text-white'>Password</p>
                </label>
                <div className="control">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">
                  <p className='text-white'>Confirm Password</p>
                </label>
                <div className="control">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">
                  <p className='text-white'>Role</p>
                </label>
                <div className="control">
                  <input
                    type="text"
                    placeholder="Enter Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">
                <p className='text-white'>Specialization (inputkan dengan data 1 ,data2 ,data3)</p>
                </label>
                <div className="control">
                  <input
                    type="text"
                    placeholder="Enter Specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">
                  <p className='text-white'>Experience</p>
                </label>
                <div className="control">
                  <input
                    type="text"
                    placeholder="Enter Experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">
                <p className='text-white'>Education</p>
                </label>
                <div className="control">
                  <input
                    type="text"
                    placeholder="Enter Education"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">
                  <p className='text-white'>License</p>
                </label>
                <div className="control">
                  <input
                    type="text"
                    placeholder="Enter License"
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                    className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPartners;
