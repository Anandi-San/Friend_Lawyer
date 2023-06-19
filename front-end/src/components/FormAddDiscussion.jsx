import React, {useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

const FormAddDiscussion = () => {
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
            navigate('/discussion');
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
    <div className='bg-[#1e252b] w-screen h-screen'>
        <h1 className='text-white text-3xl font-semibold'>Discussion</h1>
        <h2 className='text-white text-xl font-semibold'> Add Discussion</h2>
        <hr/>
        <div className="card is-shadowless" style={{ background: "#1e252b" }}>
            <div className="card-content">
                <div className="content">
                    <form onSubmit={saveDiscussion}>
                        <p className='has-text-centered'>{msg}</p>
                    <div className="field">
                            <label className='label'>
                                <p className='text-white'>Tittle</p>
                            </label>
                            <div className="control">
                                <input type="text" className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Masukkan Title'/>
                            </div>
                        </div>

                        <div className="field">
                            <label className='label'>
                                <p className="text-white">Content</p>
                            </label>
                            <div className="control">
                                <input type="text" placeholder='Masukkan Content' className="lg:w-[50%] sm:w-[40%] px-2 py-3 rounded-md bg-transparent border border-neutral-600 text-white" value={content} onChange={(e) => setContent(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button type="submit" className="rounded-md text-white font-medium px-6 my-2 py-2 bg-[#48c78e]">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormAddDiscussion