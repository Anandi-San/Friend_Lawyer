import React, {useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

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
        navigate("/discussion");
      } catch (error) {
        if(error.response){
            setMsg(error.response.data.msg);
        }   
      }
    };
  return (
    <div>
        <h1 className='title'>Discussion</h1>
        <h2 className='subtitle'> Add Discussion</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                    <form onSubmit={saveDiscussion}>
                        <p className='has-text-centered'>{msg}</p>
                    <div className="field">
                            <label className='label'>Title</label>
                            <div className="control">
                                <input type="text"  className='input' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Masukkan Title'/>
                            </div>
                        </div>

                        <div className="field">
                            <label className='label'>Content</label>
                            <div className="control">
                                <input type="text" placeholder='Masukkan Content' className='input' value={content} onChange={(e) => setContent(e.target.value)}/>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button type="submit" className='button is-success'>Save</button>
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