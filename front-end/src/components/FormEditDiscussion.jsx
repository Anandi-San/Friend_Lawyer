import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom"

const FormEditDiscussion = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(()=> {
        const getDiscussionById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/discusiion/${id}`);
                setTitle(response.data.title);
                setContent(response.data.content);
            } catch (error) {
                if(error.response){
                    setMsg(error.response.data.msg);
                }    
            }
        };
        getDiscussionById();
    }, [id]);

    const updateDiscussion =  async (e) => {
      e.preventDefault();
      try {
        await axios.patch(`http://localhost:5000/discussion/${id}`, {
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
        <h2 className='subtitle'> Edit Discussion</h2>
        <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                    <form onSubmit={updateDiscussion}>
                        <p className='has-text-center'>{msg}</p>
                    <div className="field">
                            <label className='label'>Title</label>
                            <div className="control">
                                <input type="text"  placeholder='Masukkan Title' value={title} onChange={(e) => setTitle(e.target.value)} className='input' />
                            </div>
                        </div>

                        <div className="field">
                            <label className='label'>Content</label>
                            <div className="control">
                                <input type="text" placeholder='Masukkan Content' value={content} onChange={(e) => setContent(e.target.value)} className='input' />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button type='submit' className='button is-success'>Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormEditDiscussion