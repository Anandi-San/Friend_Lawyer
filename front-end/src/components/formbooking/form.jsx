import React from 'react';
import logo from "../../img/Logo.png";
import '../../style/index.css'


function form() {
  return (
    // 
    <div className='w-full'>
      <div className='wrapper flex'>
        <div className='flex w-[22%] h-[100vh] bg-[#847D66] gap-y-8 flex-col items-center justify-center'>
            <img src={logo} className='w-[60%] mb-2' alt=''/>
            <button className='rounded-md bg-[#E2C598] text-white font-bold p-[16px_18px] w-[50%]'>Back</button>
            <button className='rounded-md bg-white text-[#E2C598] font-bold p-[16px_18px] w-[50%]'>Change Lawyer</button>
        </div>
        <div className='flex w-[88%] h-[100%] items-center m-14 flex-col'>
          <h1 className='font-semibold text-xl'>Register Pendaftaran Konsultasi</h1>
          <form className='wrapper_form flex w-full flex-col my-4 items-center'>
            <div className='flex mx-2 w-full'>
              <div className='flex flex-col gap-y-1 w-[50%] items-center'>
                <h1 className='font-semibold text-lg'>Enter Your Biodata</h1>
                <div className='my-2 w-[70%] mx-8'>
                  <h1 className='text-base mb-2'>Full Name</h1>
                  <input name='fullname' placeholder='Full Name' type='text' className='border-2 rounded-md p-4 w-full'/>
                </div>
                <div className='my-2 w-[70%] mx-8'>
                  <h1 className='text-base mb-2'>Email</h1>
                  <input name='email' type='email' placeholder='Email' className='border-2 rounded-md p-4 w-full'/>
                </div>
                <div className='my-2 w-[70%] mx-8'>
                  <h1 className='text-base mb-2'>Phone Number</h1>
                  <input name='phonenumber' type='text' placeholder='Phone Number' className='border-2 rounded-md p-4 w-full'/>
                </div>
              </div>

              <div className='flex flex-col gap-y-1 w-[50%] items-center'>
                <h1 className='font-semibold text-lg'>Choose your schedule</h1>
                <div className='my-2 w-[70%] mx-8'>
                  <h1 className='text-base mb-2'>Schedule Every Week</h1>
                  <select name='fullname' placeholder='Schedule Every Week' className='border-2 rounded-md p-4 w-full'>
                    <option value="" disabled selected>Select Day</option>
                    <option value="Schedule1">Monday</option>
                    <option value="Schedule2">tuesday</option>
                    <option value="Schedule3">Wednesday</option>
                    <option value="Schedule3">Thursday</option>
                    <option value="Schedule3">Friday</option>

                  </select>
                </div>
                <div className='my-2 w-[70%] mx-8'>
                <h1 className='text-base mb-2'>Select Hours</h1>
                  <select name='schedule' placeholder='Select Hours' className='border-2 rounded-md p-4 w-full'>
                    <option value='' disabled selected>Select Hours</option>
                    <option value="Schedule1">08:00 - 09.00</option>
                    <option value="Schedule1">10:00 - 11.00</option>
                    <option value="Schedule2">13:00 - 14:00</option>
                    <option value="Schedule3">15:00 - 16:00</option>
                  </select>
                 
                  
                </div>
              </div>
            </div>
            <div className='flex flex-col items-center w-full mt-2'>
              <div className='w-[85%]'>
                <h1 className='text-base mb-2'>Tell in detail your problem</h1>
                <textarea className='border-2 rounded-md w-full h-[20vh]'/>
              </div>
                
            </div>
            <div className='flex flex-col items-center w-full mt-4'>
                <button className='p-[12px_16px] w-[140px] border rounded-md bg-[#b56c55] font-semibold text-lg text-white' type='submit'>Daftar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};
export default form