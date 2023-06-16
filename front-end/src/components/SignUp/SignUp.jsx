import React, { useState } from "react"
import banner from '../../img/lawyer_login.jpg'
import { useNavigate } from "react-router-dom"
import axios from "axios"

function SignUp() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confpassword, setConfPassword] = useState("")
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const saveNewUser = async (e) => {
        e.preventDefault();
      try {
        await axios.post("http://localhost:5000/users", {
            name: username,
            email: email,
            password: password,
            confPassword: confpassword,
        });
         navigate("/homepage");
        } catch (error) {
        if(error.response){
      setMsg(error.response.data.msg);
         }   
        }
    }

    const signIn = () => {
        navigate('/')
    }

  return (
    <section className='w-full bg-[#16202A] flex overflow-auto max-h-[100vh] items-center flex-col justify-start'>
        <div className='w-full h-[100vh] flex items-end justify-start'>
            <div className='flex-[0_0_auto] w-[50%] h-full flex relative self-center items-start flex-col justify-start'>
                <div className='w-[90%] h-auto m-auto flex self-center items-center flex-col justify-center'>
                    <div className="my-4 text-white">
                      <h1 className='text-4xl self-center  py-2 text-left font-bold'>Create Account</h1>
                      <span className='text-[#7a7c85] text-lg self-center font-medium mb-8'>Find discussion partners and consult with professional lawyers</span>
                      <p className='has-text-center'>{msg}</p>
                    </div>
                    <form  className='gap-3 w-[50%] h-auto flex max-w-[50%] self-center my-4 flex-col' onSubmit={saveNewUser}>
                    <div className="field ">
                        <label className='font-medium text-white'>Username</label>
                        <div className="control">
                            <input type="text" placeholder="Masukkan Username" className='rounded-full text-white w-full py-2 px-4 bg-transparent border border-[#7a7c85]' value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                    </div>
                    
                    <div className="field ">
                        <label className='font-medium text-white'>Email</label>
                        <div className="control">
                            <input type="text" placeholder="Masukkan Email" className='rounded-full text-white w-full py-2 px-4 bg-transparent border border-[#7a7c85]' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>

                    <div className="field">
                        <label className='font-medium text-white'>Password</label>
                        <div className="control">
                            <input type="password" placeholder='********' className='rounded-full text-white w-full py-2 px-4 bg-transparent border border-[#7a7c85]'  value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div className="field">
                        <label className='font-medium text-white'>Confirm Password</label>
                        <div className="control">
                            <input type="password" placeholder='********' className='rounded-full text-white w-full py-2 px-4 bg-transparent border border-[#7a7c85]'  value={confpassword} onChange={(e) => setConfPassword(e.target.value)} />
                        </div>
                    </div>
                    <hr className="border-b"/>
                    <div className="field mt-5">
                        <div className="control">
                            <button type='submit' className='text-2xl font-medium text-white items-center w-full border rounded-full px-4 py-2'>
                            Register
                            </button>
                            <button type='submit' className='text-2xl font-medium text-white items-center w-full border rounded-full px-4 py-2 mt-5' onClick={signIn}>
                            Sign in
                            </button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            <div className='w-[50%] h-full flex self-center items-start justify-center '>
                <img className="w-[100%] h-full object-cover brightness-[.65]" alt="" src={banner}/>
            </div>
        </div>
    </section>
  );
};

export default SignUp