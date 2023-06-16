import React, { useState, useEffect } from 'react'
import Logo from '../../img/Logo_1.png'
import { useNavigate } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai';
import { HiUserGroup } from 'react-icons/hi';
import { MdForum, MdNotifications } from 'react-icons/md';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { LogOut, reset } from '../../features/authSlice';

function Navbar() {
    const navigate = useNavigate()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeIcon, setActiveIcon] = useState(null);
    const dispatch = useDispatch();


    const [user, setUsers] = useState([]);

    const saved = JSON.parse(localStorage.getItem("user"));
    const id = saved.uuid;
    // console.log(id)

    useEffect(() => {
      getUserById();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const getUserById = async () => {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setUsers(response.data);
        // console.log(response.data)
    };

    const handleIconClick = (iconName, route) => {
      if (activeIcon === iconName) {
        // Jika ikon yang sama diklik, hapus status aktif
        setActiveIcon(null);
      } else {
        // Jika ikon yang berbeda diklik, ubah menjadi ikon aktif
        setActiveIcon(iconName);
        navigate(route);
      }
    };
  

    const handleProfileClick = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    // const handlehome = () => {
    //   navigate("/homepage")
    // };

    // const handleUserGroup = () => {
    //   navigate("/DirectConsultationPage")
    // };

    // const handleforum = () => {
    //   navigate("/discussionforum")
    // };

    const handlenotif = () => {
      navigate(`/notif/${id}`)
    }

    const logout = () => {
      dispatch(LogOut());
      dispatch(reset());
      navigate("/");
    };

  return (
    <>
        <nav className="bg-[#171C21] w-full flex justify-between p-4">
            <div className='flex items-center w-[50%] gap-12'>
                <div className='flex gap-2 items-center'>
                    <img className='w-[35px]' alt='' src={Logo}/>
                    <h1 className='text-xl font-sans text-white font-bold'>Friend Lawyer</h1>
                </div>
                <div className='flex items-center gap-5'>
                <button
                    className={`bg-[#262D34] drop-shadow-lg p-2 rounded-lg ${window.location.pathname === '/homepage' ? 'text-orange-500': 'text-white'}`}
                    onClick={() => handleIconClick('home', '/homepage')}
                  >
                    <AiFillHome className='text-3xl' />
                  </button>
                  <button
                    className={`bg-[#262D34] drop-shadow-lg p-2 rounded-lg ${window.location.pathname === '/DirectConsultationPage' ? 'text-orange-500': 'text-white'}`}
                    onClick={() => handleIconClick('userGroup', '/DirectConsultationPage')}
                  >
                    <HiUserGroup className='text-3xl' />
                  </button>
                  <button
                      className={`bg-[#262D34] drop-shadow-lg p-2 rounded-lg ${window.location.pathname === '/discussionforum' ? 'text-orange-500': 'text-white'}`}
                      onClick={() => handleIconClick('forum', '/discussionforum')}
                    >
                      <MdForum className='text-3xl' />
                    </button>
                   
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <button className={`bg-[#262D34] drop-shadow-lg p-2 rounded-lg ${window.location.pathname.indexOf('/notif') !== -1 ? 'text-orange-500': 'text-white'}`}
                 onClick={() => handlenotif('notif', '/notif')} title=''>
                    <MdNotifications className='text-3xl'/>
                </button>
                <div className="relative">
        <button
          onClick={handleProfileClick}
          className="flex items-center gap-2 mx-4 text-white focus:outline-none"
        >
            <img className='w-[45px] rounded-lg' 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`} alt='Avatar'/>
          <span className="mr-2">{user.name}</span>
        </button>

        {/* Dropdown */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg">
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Profile
            </a>
            <a href='' className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={logout}>
              Logout
            </a>
          </div>
        )}
      </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar