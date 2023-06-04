import React, {useEffect, useState} from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForumList = () => {
    const [discussions, setDiscussions] = useState([]);


    useEffect(()=>{
        getDiscussions();
    },[]);

    const getDiscussions = async () => {
        const response = await axios.get("http://localhost:5000/discussion");
        setDiscussions(response.data);
    };

  return (
    <div>
    <h1 className='title'>Discussion</h1>
    <h2 className='subtitle'>List of Discussion</h2>
        <table className='table is-striped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>title</th>
                    <th>Content</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {discussions.map((discussion, index) => (
                      <tr key={discussion.uuid}>
                      <td>{index + 1}</td>
                      <td>{discussion.title}</td>
                      <td>{discussion.content}</td>
                      <td>
                        <Link to = {`/discussion/${discussion.uuid}`} className='button is-small is-primary' >Join</Link>
                      </td>
                  </tr>
                ))}
            </tbody>
        </table>
     </div>
  );
};

export default ForumList