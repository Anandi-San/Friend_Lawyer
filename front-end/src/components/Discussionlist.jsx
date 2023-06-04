import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Discussionlist = () => {
    const [discussions, setDiscussions] = useState([]);


    useEffect(()=>{
        getDiscussions();
    },[]);

    const getDiscussions = async () => {
        const response = await axios.get("http://localhost:5000/discussion");
        setDiscussions(response.data);
    };

    const deleteDiscussion = async (discussionId) => {
        await axios.delete(`http://localhost:5000/discussion/${discussionId}`);
        getDiscussions();
    };

  return (
    <div>
    <h1 className='title'>Discussion</h1>
    <h2 className='subtitle'>List of Discussion</h2>
    <Link to="/discussion/add" className='button is-primary mb-2'>Add new</Link>
        <table className='table is-striped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>title</th>
                    <th>Content</th>
                    <th>createdBy</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {discussions.map((discussion, index) => (
                      <tr key={discussion.uuid}>
                      <td>{index + 1}</td>
                      <td>{discussion.title}</td>
                      <td>{discussion.content}</td>
                      <td>{discussion.user.name}</td>
                      <td>
                        <Link to = {`/discussion/edit/${discussion.uuid}`} className='button is-small is-info' >Edit</Link>
                        <button onClick={() => deleteDiscussion(discussion.uuid)} className='button is-small is-danger' >delete</button>
                      </td>
                  </tr>
                ))}
            </tbody>
        </table>
     </div>
  );
};

export default Discussionlist