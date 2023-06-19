import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';


const ForumList = () => {
  const [discussions, setDiscussions] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    getDiscussions();
  }, []);

  const getDiscussions = async () => {
    const response = await axios.get('http://localhost:5000/discussion');
    const reversedDiscussions = response.data.reverse();
    setDiscussions(reversedDiscussions);
  };

  const creatediscussion = async () => {
    navigate("/add/discussion");
  }

  return (
    <div className='bg-[#1E252B] flex flex-col items-center h-auto text-white'>
      <h1 className='text-4xl font-bold my-5'>DISCUSSION LIST</h1>
      {discussions.map((item) => {
        return (
      <div key={item.uuid} className='flex bg-[#262D34] items-center drop-shadow-lg p-4 my-3 rounded-xl w-[50%]'>
        <div className='bg-[#1E252B] flex my-2 font-medium text-lg rounded-xl drop-shadow-md p-8 w-[20%] text-center h-auto justify-center mx-2'>
          {item.title}
        </div>
        <div className='mx-2 my-2 flex flex-col gap-y-2 w-[80%]'>
          <p className='text-lg font-semibold'>{item.content}</p>
          <div className='flex justify-end'>
            <Link to={`/discussion/${item.uuid}`} className='px-5 rounded-full py-3 drop-shadow-lg my-2 bg-[#1E252B] text-lg font-semibold'>Join Chat</Link>
          </div>
        </div>
      </div>
        )
      })}
      <div className='fixed bottom-4 right-4'>
    <button className='bg-[#262D34] text-white rounded-full p-4 shadow-lg text-5xl' onClick={creatediscussion}>
      <AiOutlinePlus/>
    </button>
  </div>
    </div>
    // <div className='bg-[#1E252B] h-screen min-h-screen text-white'>
    //   <h1 className="text-3xl font-bold mb-2 text-center">List Discussion</h1>
    //   <div>
    //     <table className="w-full border-collapse border border-white">
    //       <thead>
    //         <tr>
    //           <th className="py-2 px-4 border-b font-semibold text-white text-left">No</th>
    //           <th className="py-2 px-4 border-b font-semibold text-white text-left">Title</th>
    //           <th className="py-2 px-4 border-b font-semibold text-white text-left">Content</th>
    //           <th className="py-2 px-4 border-b font-semibold text-white text-left">Action</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {discussions.map((discussion, index) => (
    //           <tr key={discussion.uuid}>
    //             <td className="py-2 px-4 border-b">{index + 1}</td>
    //             <td className="py-2 px-4 border-b">{discussion.title}</td>
    //             <td className="py-2 px-4 border-b">{discussion.content}</td>
    //             <td className="py-2 px-4 border-b">
    //               <Link
    //                 to={`/discussion/${discussion.uuid}`}
    //                 className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-sm"
    //               >
    //                 Join
    //               </Link>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    //   <div className="flex justify-end mt-5 mr-5">
    //     <button type='submit' className='text-2xl font-medium text-white border rounded-full px-4 py-2' onClick={creatediscussion}>
    //       Create Discussion
    //     </button>
    //   </div>
    // </div>
  );
};

export default ForumList;
