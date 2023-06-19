import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../img/Black.jpg";
import { useDispatch } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const handleButtonClick = () => {
    navigate('/homepage');
  }

  return (
    <div>
      <nav className="navbar fixed-top shadow-lg bg-[#171C21]" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <NavLink to="/dashboard" className="navbar-item">
            <img src={logo} style={{ width: "140px", height: "100px" }} alt="logo" />
          </NavLink>

          <a href="!#" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu bg-[#171C21]">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button onClick={handleButtonClick} className="button is-primary">
                  Homepage
                </button>
                <button onClick={logout} className="button is-light">
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
