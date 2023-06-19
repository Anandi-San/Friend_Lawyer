import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import Swal from 'sweetalert2';


const FormEditUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [role, setRole] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    // console.log(id)

    useEffect(()=> {
        const getUserById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users/${id}`);
                setName(response.data.name);
                setEmail(response.data.email);
                setRole(response.data.role);
            } catch (error) {
                if(error.response){
                    setMsg(error.response.data.msg);
                }    
            }
        };
        getUserById();
    }, [id]);

    const UpdateUser =  async (e) => {
      e.preventDefault();
      try {
        await axios.patch(`http://localhost:5000/users/${id}`, {
            name: name,
            email: email,
            password: password,
            confPassword: confPassword,
            role: role
        });
        Swal.fire({
            icon: 'success',
            title: 'User Updated',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate('/users');
          });
        } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to update user.',
          });
        }
      };

  return (
    <div className='bg-[#1e252b] w-screen h-screen'>
        <h1 className='text-white text-3xl font-semibold'>Users</h1>
        <h2 className='text-white text-xl font-semibold'> Edit User</h2>
        <hr />
        <div className="card is-shadowless" style={{ background: "#1e252b" }}>
            <div className="card-content">
                <div className="content">
                    <form onSubmit={UpdateUser}>
                    <p className='has-text-center'>{msg}</p>
                    <div className="field">
                            <label className='label'>
                                <p className='text-white'>Nama</p>
                            </label>
                            <div className="control">
                                <input type="text" placeholder='Masukkan Nama' value={name} onChange={(e) => setName(e.target.value)} className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white"/>
                            </div>
                        </div>

                        <div className="field">
                            <label className='label'>
                                <p className='text-white'>Email</p>
                            </label>
                            <div className="control">
                                <input type="text" placeholder='Masukkan Email' value={email} onChange={(e) => setEmail(e.target.value)} className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white"/>
                            </div>
                        </div>
                        <div className="field">
                            <label className='label'>
                                <p className='text-white'>Password</p>
                            </label>
                            <div className="control">
                                <input type="password" placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)}  className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white"/>
                            </div>
                        </div>
                        <div className="field">
                            <label className='label'>
                                <p className='text-white'>Confirm</p>
                            </label>
                            <div className="control">
                                <input type="password" placeholder='********' value={confPassword} onChange={(e) => setConfPassword(e.target.value)} className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white"/>
                            </div>
                        </div>
                        <div className="field">
                            <label className='label'>
                                <p className='text-white'>Role</p>
                            </label>
                            <div className="control">
                                <div className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600">
                                <select value={role} onChange={(e) => setRole(e.target.value)} >
                                    <option value="admin">Admin</option>
                                    <option value="Lawyer">Lawyer</option>
                                    <option value="User">User</option>
                                </select>
                            </div>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button type='submit' className='button is-success'>Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormEditUser