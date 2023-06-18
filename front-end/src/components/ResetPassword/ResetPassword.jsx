import React, { useState, useEffect } from "react";
import banner from "../../img/lawyer_login.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const [ setUsers] = useState("")
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
//   const { id } = useParams();

    useEffect(()=>{
    getUsers();
    // eslint-disable-next-line
    },[]);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
    console.log(response.data)
    };

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/resetpassword", {
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword,
        confPassword: confPassword,
      });
      setMsg(response.data.msg);
    } catch (error) {
      setMsg(error.response.data.msg);
    }
  };

  const signIn = () => {
    navigate("/");
  };

  return (
    <section className="w-full bg-[#16202A] flex overflow-auto max-h-[100vh] items-center flex-col justify-start">
      <div className="w-full h-[100vh] flex items-end justify-start">
        <div className="flex-[0_0_auto] w-[50%] h-full flex relative self-center items-start flex-col justify-start">
          <div className="w-[90%] h-auto m-auto flex self-center items-center flex-col justify-center">
            <div className="my-4 text-white">
              <h1 className="text-4xl self-center py-2 text-left font-bold">
                Reset Password
              </h1>
              <span className="text-[#7a7c85] text-lg self-center font-medium mb-8">
                Please reset your password using your email and old password.
              </span>
              <p className="has-text-center">{msg}</p>
            </div>
            <form
              className="gap-3 w-[50%] h-auto flex max-w-[50%] self-center my-4 flex-col"
              onSubmit={resetPassword}
            >
              <div className="field">
                <label className="font-medium text-white">Email</label>
                <div className="control">
                  <input
                    type="text"
                    placeholder="Enter Email"
                    className="rounded-full text-white w-full py-2 px-4 bg-transparent border border-[#7a7c85]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label className="font-medium text-white">Old Password</label>
                <div className="control">
                  <input
                    type="password"
                    placeholder="********"
                    className="rounded-full text-white w-full py-2 px-4 bg-transparent border border-[#7a7c85]"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label className="font-medium text-white">New Password</label>
                <div className="control">
                  <input
                    type="password"
                    placeholder="********"
                    className="rounded-full text-white w-full py-2 px-4 bg-transparent border border-[#7a7c85]"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label className="font-medium text-white">
                  Confirm New Password
                </label>
                <div className="control">
                  <input
                    type="password"
                    placeholder="********"
                    className="rounded-full text-white w-full py-2 px-4 bg-transparent border border-[#7a7c85]"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                  />
                </div>
              </div>

              <hr className="border-b" />
              <div className="field mt-5">
                <div className="control">
                  <button
                    type="submit"
                    className="text-2xl font-medium text-white items-center w-full border rounded-full px-4 py-2 mt-5"
                  >
                    Reset Password
                  </button>
                  <button
                    type="button"
                    className="text-2xl font-medium text-white items-center w-full border rounded-full px-4 py-2 mt-5"
                    onClick={signIn}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-[50%] h-full flex self-center items-start justify-center ">
          <img
            className="w-[100%] h-full object-cover brightness-[.65]"
            alt=""
            src={banner}
          />
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
