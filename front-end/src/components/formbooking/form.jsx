import React from 'react';
import logo from "../../img/Logo.png";
import '../../style/index.css'


function form() {
  return (
    // 
    <div className='w-full'>
      <div className='wrapper flex'>
        <div className='flex w-[22%] h-[100vh] bg-[#e98b6d] gap-y-8 flex-col items-center justify-center'>
            <img src={logo} className='w-[60%] mb-2'/>
            <button className='rounded-md bg-[#b56c55] text-white font-bold p-[16px_18px] w-[50%]'>Back</button>
            <button className='rounded-md bg-white text-[#b56c55] font-bold p-[16px_18px] w-[50%]'>Change Lawyer</button>
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
                  <h1 className='text-base mb-2'>Eamil</h1>
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
                  <option value="Schedule1">Schedule1</option>
                    <option value="Schedule2">Schedule2</option>
                    <option value="Schedule3">Schedule3</option>
                  </select>
                </div>
                <div className='my-2 w-[70%] mx-8'>
                  <h1 className='text-base mb-2'>Select Hours</h1>
                  <select name='schedule' placeholder='Select Hours' className='border-2 rounded-md p-4 w-full'>
                    <option value="Schedule1">Schedule1</option>
                    <option value="Schedule2">Schedule2</option>
                    <option value="Schedule3">Schedule3</option>
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

{/* <div className="columns" style={{ height: '100vh' }}>
    //   <div className="column is-one-fifth kiri" style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
    //     <div className="box" style={{ backgroundColor: '#EBC08D', minHeight: 'calc(100vh - 1rem)', padding: '1rem' }}>
    //       <div className="logo" style={{ marginBottom: '1rem', textAlign: 'center', marginTop: '10rem' }}>
    //         <img src={logo} alt="Logo" style={{ width: '300px' }} />
    //       </div>
    //       Konten Kiri
    //     </div>
    //   </div>
    //   <div className="column kanan" style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
    //     <h1 style={{ textAlign: 'center', fontWeight: 'bold', color: '#F00', marginTop: '5rem', marginBottom: '3rem' }}>Registrasi Pendaftaran Konsultasi</h1>
    //     <div className="columns">
    //         <div className="column" style={{ padding: '1rem' }}>
    //         <h2 style={{textAlign: 'center'}}>Enter Your Biodata</h2>
    //         <div className="control" style={{ textAlign: 'center' }}>
    //         <p>Enter Your Full Name</p>
    //         <input type="text" className="input" placeholder="Masukkan Title" style={{ width: '250px' }} />
    //         </div>

    //         </div>
    //         <div className="column" style={{ padding: '1rem' }}>
    //         <h2 style={{textAlign: 'center'}}>Chose Your Schedule</h2>
    //         </div>
    //     </div>
    //     </div>
    //   </div> */}