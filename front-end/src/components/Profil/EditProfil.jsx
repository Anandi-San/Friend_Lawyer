import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

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
        // console.log(name)
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getPartnersById();
  }, [id]);

  const updateProfil = async (e) => {
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
      navigate(`/users/${id}`);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">PROFILE</h1>
      <h2 className="subtitle">Edit ProfilE</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateProfil}>
              <p className="has-text-center">{msg}</p>
              {role === 'Lawyer' ? (
                <>
                  <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                      <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                      />
                    </div>
                  </div>


                  <div className="field">
                    <label className="label">Specialization (inputkan dengan data1 ,data2 ,data3)</label>
                    <div className="control">
                      <input
                        type="text"
                        placeholder="Enter Specialization"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Experience</label>
                    <div className="control">
                      <input
                        type="text"
                        placeholder="Enter Experience"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Education</label>
                    <div className="control">
                      <input
                        type="text"
                        placeholder="Enter Education"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">License</label>
                    <div className="control">
                      <input
                        type="text"
                        placeholder="Enter License"
                        value={license}
                        onChange={(e) => setLicense(e.target.value)}
                        className="input"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                 <div className="field">
                            <label className='label'>Nama</label>
                            <div className="control">
                                <input type="text" placeholder='Masukkan Nama' value={name} onChange={(e) => setName(e.target.value)} className='input'/>
                            </div>
                        </div>

                        <div className="field">
                            <label className='label'>Email</label>
                            <div className="control">
                                <input type="text" placeholder='Masukkan Email' value={email} onChange={(e) => setEmail(e.target.value)} className='input'/>
                            </div>
                        </div>
                </>
              )}

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

export default EditProfile;
