import React from 'react'
import {NavLink, useNavigate} from "react-router-dom";
import {IoPerson, IoPricetag, IoLogOut, IoHome} from "react-icons/io5";
import { AiFillMessage, AiOutlineForm, AiOutlineCheck } from "react-icons/ai";
import {FaUserFriends} from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from '../features/authSlice';


const Sidebar = ( { width } ) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
<div className= 'w-auto bg-[#171C21]'>
      <aside className="menu pl-2 has-shadow ">
        <div className="menu-label">
          <p className='flex gap-2 items-center text-lg p-1 mx-1'>General</p>
        </div>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}>
              <div className='flex gap-2 items-center text-lg p-1 mx-1'>
              <IoHome /> Dashboard
              </div>
            </NavLink>
          </li>
          {user && user.role === "admin" && (
            <ul>
          <li>
            <NavLink to={"/discussion"}>
            <div className='flex gap-2 items-center text-lg p-1 mx-1'>
              <IoPricetag /> Discussion
            </div>
            </NavLink>
          </li>
          <li>
          <NavLink to={"/message"}>
          <div className='flex gap-2 items-center text-lg p-1 mx-1'>
              <AiFillMessage /> Message
          </div>
            </NavLink>
          </li>
          </ul>
          )}
          <li>
          <NavLink to={"/form"}>
          <div className='flex gap-2 items-center text-lg p-1 mx-1'>
              <AiOutlineForm /> ListConsul
          </div>
            </NavLink>
          </li>
          <li>
          <NavLink to={"/formaccepted"}>
          <div className='flex gap-2 items-center text-lg p-1 mx-1'>
              <AiOutlineCheck /> Accepted
          </div>
            </NavLink>
          </li>
        </ul>
        {user && user.role === "admin" && (
          <div>
            <div className="menu-label">
              <p className='flex gap-2 items-center text-lg p-1 mx-1'>Admin</p>
            </div>
            <ul className="menu-list">
              <li>
                <NavLink to={"/users"}>
                <div className='flex gap-2 items-center text-lg p-1 mx-1'>
                  <IoPerson /> Users
                </div>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/partners"}>
                <div className='flex gap-2 items-center text-lg p-1 mx-1'>
                  <FaUserFriends /> Mitra
                </div>
                </NavLink>
              </li>
            </ul>
         
          </div>
        )}
        <div className="menu-label">
          <p className='flex gap-2 items-center text-lg p-1 mx-1'>
          Settings
          </p>
          </div>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
            <div className='flex gap-2 items-center text-lg p-1 mx-1'>
              <IoLogOut /> Logout
            </div>
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar