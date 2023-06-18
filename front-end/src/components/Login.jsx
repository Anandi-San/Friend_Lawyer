import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import {LoginUser, reset} from "../features/authSlice";
import banner from "../img/lawyer_login.jpg"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, isError, isSuccess, isLoading, message} = useSelector(
      (state) => state.auth
      );

      useEffect(()=>{
        if(user || isSuccess){
          localStorage.setItem('user', JSON.stringify(user))
          navigate("/homepage");
        }
        dispatch(reset());
      }, [user, isSuccess, dispatch, navigate]);

      const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({email, password}));
      };

      const signUp = () => {
        navigate('/register');
      };

      const ResetPassword = () => {
        navigate('/resetpassword')
      }
  return (
    <section className='w-full bg-[#16202A] flex overflow-auto max-h-[100vh] items-center flex-col justify-start'>
        <div className='w-full h-[100vh] flex items-end justify-start'>
            <div className='flex-[0_0_auto] w-[50%] h-full flex relative self-center items-start flex-col justify-start'>
            {/* <img src='/playground_assets/logo%20black.svg' alt='' loading='lazy' className='top-[27px] left-[49px] w-[100px] absolute object-cover cursor-pointer'/> */}
                <div className='w-[90%] h-auto m-auto flex self-center items-center flex-col justify-center'>
                    <div className="my-4 text-white">
                      <h1 className='text-4xl self-center  py-2 text-left font-bold'>Welcome To LawyerFriend</h1>
                      <span className='text-[#7a7c85] text-lg self-center font-medium mb-8'>Find discussion partners and consult with professional lawyers</span>
                    </div>
                    <div className='w-[50%] h-auto flex max-w-[50%] self-center my-2'>
                    <button className='text-2xl font-medium text-white items-center w-full border rounded-full px-4 py-2' onClick={signUp}>
                    Sign Up
                    </button>
                    </div>
                    
                    <form onSubmit={Auth} className='gap-4 w-[50%] h-auto flex max-w-[50%] self-center my-4 flex-col'>
                    { isError && <p className='has-text-centered'>{message}</p> }

                    <hr className="border-b"/>
                      
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
                    <div className="field mt-5">
                        <div className="control">
                            <button type='submit' className='text-2xl font-medium text-white items-center w-full border rounded-full px-4 py-2'>
                              {isLoading ? "Loading...." : "Login"}
                            </button>
                        </div>
                    </div>
                    </form>
                    <div className='w-[50%] h-auto flex max-w-[50%] self-center my-2'>
                      <button className='text-2xl font-medium text-white items-center w-full border rounded-full px-4 py-2' onClick={ResetPassword}>
                        Reset Password
                      </button>
                    </div>
                </div>
            </div>
            <div className='w-[50%] h-full flex self-center items-start justify-center '>
                <img className="w-[100%] h-full object-cover brightness-[.65]" alt='' src={banner}/>
            </div>
        </div>
    </section>
  );
};

export default Login