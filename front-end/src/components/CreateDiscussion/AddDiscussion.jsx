import React, {useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

const AddDiscussion = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const saveDiscussion =  async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:5000/discussion", {
            title: title,
            content: content
        });
        Swal.fire({
            icon: 'success',
            title: 'Discussion Created',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate('/discussionforum');
          });
        } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to create discussion.',
          });
        }
      };
  return (
    <div className='min-h-screen bg-[#262D34] text-white'>
        <h1 className='text-2xl font-bold ml-4'>Discussion</h1>
        <h2 className='text-xl font-bold ml-4'> Add Discussion</h2>
        <hr />
        <div className=" card bg-[#1E252B]">
            <div className="bg-[#1E252B]">
                <div className="content text-white">
                    <form onSubmit={saveDiscussion}>
                        <p className='has-text-centered'>{msg}</p>
                    <div className="field mt-5">
                            <label className='text-white ml-4'>Title</label>
                            <div className="control">
                                <input type="text"  className='lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white ml-4' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Masukkan Title'/>
                            </div>
                        </div>

                        <div className="field mt-5">
                            <label className='text-white ml-4'>Content</label>
                            <div className="control">
                                <input type="text" placeholder='Masukkan Content' className='lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white ml-4' value={content} onChange={(e) => setContent(e.target.value)}/>
                            </div>
                        </div>
                        <div className="flex flex-col w-full mt-4">
                                <button
                                    className="p-[12px_16px] w-[140px] border rounded-md bg-[#1E252B] font-semibold text-lg text-white ml-4"
                                    type="submit"
                                >
                                    Create
                                </button>
                                </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddDiscussion