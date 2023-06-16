import React from "react";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import logo from "../../img/Logo.png";
import "../../style/index.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';

function Form() {
  const { userId } = useParams()
  const [users, setUsers] = useState();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [day, setDay] = useState();
  const [hours, setHours] = useState();
  const [problem, setProblem] = useState();
  const [id,setId] = useState()
  // console.log(id)

  useEffect(() => {
    const dataUser = JSON.parse(localStorage.getItem('user'))
    if(dataUser) {
      setId(dataUser.id)
    }
    getPartners();
  }, []);

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setDay('');
    setHours('');
    setProblem('');
  };

  
  const saveForm = async (e) => {
    e.preventDefault()
    // const url = window.location.href;
    // const userId = url.split("/").pop();
    // console.log(userId)
    const postUrl = `http://localhost:5000/booking/${userId}`;

    const requestBody = {
      full_name: fullName,
      email: email,
      phonenumber: phoneNumber,
      day: day,
      hours: hours,
      problem: problem,
      // status: status
      clientid: id,
      lawyerId: userId,
    };

    try {
      const response = await axios.post(postUrl, requestBody);
      console.log("Form saved successfully:", response.data);
      Swal.fire({
        title: 'Success!',
        text: 'Permintaan anda telah diterima',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        resetForm();
        window.location.reload();
      });
    } catch (error) {
      console.error("Error saving form:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Error saving form: ' + error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };


  const getPartners = async () => {
    const response = await axios.get("http://localhost:5000/partners");
    setUsers(response.data);
    // console.log(response.data) //uahhh
  };

  const back = () => {
    window.history.back();
  };

  const changeLawyer = () => {
    window.location.href = "/DirectConsultationPage";
  };

  return (
    //
    <div className="w-full bg-[#262D34] text-white">
      <div className="wrapper flex">
        <div className="flex w-[22%] h-[100vh] bg-[#1E252B] gap-y-8 flex-col items-center justify-center">
          <img src={logo} className="w-[60%] mb-2" alt="" />
          <button
            className="rounded-md bg-[#262D34] text-white font-bold p-[16px_18px] w-[50%]"
            onClick={back}>
            Back
          </button>
          <button
            className="rounded-md bg-white text-[#262D34] font-bold p-[16px_18px] w-[50%]"
            onClick={changeLawyer}>
            Change Lawyer
          </button>
        </div>
        <div className="flex w-[88%] h-[100%] items-center m-14 flex-col">
          <h1 className="font-semibold text-xl">
            Register Pendaftaran Konsultasi
          </h1>
          <form
            className="wrapper_form flex w-full flex-col my-4 items-center"
            onSubmit={saveForm}>
            <div className="flex mx-2 w-full">
              <div className="flex flex-col gap-y-1 w-[50%] items-center">
                <h1 className="font-semibold text-lg">Enter Your Biodata</h1>
                <div className="my-2 w-[70%] mx-8">
                  <h1 className="text-base mb-2">Full Name</h1>
                  <input
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                    name="fullname"
                    placeholder="Full Name"
                    type="text"
                    className="border-2 rounded-md p-4 w-full"
                  />
                </div>
                <div className="my-2 w-[70%] mx-8">
                  <h1 className="text-base mb-2">Email</h1>
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="border-2 rounded-md p-4 w-full"
                  />
                </div>
                <div className="my-2 w-[70%] mx-8">
                  <h1 className="text-base mb-2">Phone Number</h1>
                  <input
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                    name="phonenumber"
                    type="text"
                    placeholder="Phone Number"
                    className="border-2 rounded-md p-4 w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-y-1 w-[50%] items-center">
                <h1 className="font-semibold text-lg">Choose your schedule</h1>
                <div className="my-2 w-[70%] mx-8">
                  <h1 className="text-base mb-2">Schedule Every Week</h1>
                  <select
                    onChange={(e) => {
                      setDay(e.target.value);
                    }}
                    name="fullname"
                    placeholder="Schedule Every Week"
                    className="border-2 rounded-md p-4 w-full text-black">
                    <option value="" disabled selected>
                      Select Day
                    </option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                  </select>
                </div>
                <div className="my-2 w-[70%] mx-8">
                  <h1 className="text-base mb-2">Select Hours</h1>
                  <select
                    onChange={(e) => {
                      setHours(e.target.value);
                    }}
                    name="schedule"
                    placeholder="Select Hours"
                    className="border-2 rounded-md p-4 w-full text-black">
                    <option value="" disabled selected>
                      Select Hours
                    </option>
                    <option value="08:00-09:00">08:00 - 09.00</option>
                    <option value="10:00-11.00">10:00 - 11.00</option>
                    <option value="13:00-14:00">13:00 - 14:00</option>
                    <option value="15:00-16:00">15:00 - 16:00</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center w-full mt-2">
              <div className="w-[85%]">
                <h1 className="text-base mb-2">Tell in detail your problem</h1>
                <textarea
                  onChange={(e) => {
                    setProblem(e.target.value);
                  }}
                  className="border-2 rounded-md w-full h-[20vh]"
                />
              </div>
            </div>

            <div className="flex flex-col items-center w-full mt-4">
              <button
                className="p-[12px_16px] w-[140px] border rounded-md bg-[#1E252B] font-semibold text-lg text-white"
                type="submit">
                Daftar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
