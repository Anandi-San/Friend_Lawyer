import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForumList = () => {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    getDiscussions();
  }, []);

  const getDiscussions = async () => {
    const response = await axios.get('http://localhost:5000/discussion');
    setDiscussions(response.data);
  };

  return (
    <div className='bg-[#1E252B] h-screen min-h-screen text-white'>
  <h1 className="text-3xl font-bold mb-2 text-center">List Discussion</h1>
  <div className=''>
    
      <table className="w-full border-collapse border border-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b font-semibold text-white text-left">No</th>
            <th className="py-2 px-4 border-b font-semibold text-white text-left">Title</th>
            <th className="py-2 px-4 border-b font-semibold text-white text-left">Content</th>
            <th className="py-2 px-4 border-b font-semibold text-white text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {discussions.map((discussion, index) => (
            <tr key={discussion.uuid}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{discussion.title}</td>
              <td className="py-2 px-4 border-b">{discussion.content}</td>
              <td className="py-2 px-4 border-b">
                <Link
                  to={`/discussion/${discussion.uuid}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-sm"
                >
                  Join
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>




      {/* <table className="w-full border-collapse border border-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b font-semibold text-white text-left">No</th>
            <th className="py-2 px-4 border-b font-semibold text-white text-left">Title</th>
            <th className="py-2 px-4 border-b font-semibold text-white text-left">Content</th>
            <th className="py-2 px-4 border-b font-semibold text-white text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {discussions.map((discussion, index) => (
            <tr key={discussion.uuid}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{discussion.title}</td>
              <td className="py-2 px-4 border-b">{discussion.content}</td>
              <td className="py-2 px-4 border-b">
                <Link
                  to={`/discussion/${discussion.uuid}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-sm"
                >
                  Join
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default ForumList;
