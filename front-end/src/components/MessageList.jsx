import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';

const MessageList = () => {
    const [messages, setMessages] = useState([]);


    useEffect(()=>{
        getMessages();
    },[]);

    const getMessages = async () => {
        const response = await axios.get("http://localhost:5000/message");
        setMessages(response.data);
    };

    const deleteMessages = async (messageId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
          }).then(async (result) => {
            if (result.isConfirmed) {
              await axios.delete(`http://localhost:5000/message/${messageId}`);
              Swal.fire({
                icon: 'success',
                title: 'Message Deleted',
                showConfirmButton: false,
                timer: 1500,
              });
              getMessages();
            }
          });
        };

  return (
    <div className='bg-[#1e252b] w-screen'>
    <h1 className='text-white text-3xl font-semibold'>Message</h1>
    <h2 className='text-white text-xl font-semibold mb-4'>List of Messages</h2>
        <table className='table is-striped' style={{ backgroundColor: "#1e252b", color: "white", width: "90%" }}>
            <thead>
                <tr>
                    <th>
                        <p className='text-white'>No</p>
                    </th>
                    <th>
                        <p className='text-white'>Message</p>
                    </th>
                    <th>
                        <p className='text-white'>Title</p>
                    </th>
                    <th>
                        <p className='text-white'>createdBy</p>
                    </th>
                    <th>
                        <p className='text-white'>Action</p>
                    </th>
                </tr>
            </thead>
            <tbody>
                {messages.map((message, index) => (
                      <tr className='bg-[#1e252b] text-white' key={message.uuid}>
                      <td className='bg-[#1e252b] text-white' >{index + 1}</td>
                      <td className='bg-[#1e252b] text-white'>{message.pesan}</td>
                      <td className='bg-[#1e252b] text-white'>{message.discussion.title}</td>
                      <td className='bg-[#1e252b] text-white'>{message.user.name}</td>
                      <td className='bg-[#1e252b] text-white'>
                            <button onClick={() => deleteMessages(message.uuid)} className='button is-small is-danger'>
                                Delete
                            </button>
                      </td>
                  </tr>
                ))}
            </tbody>
        </table>
     </div>
  );
};

export default MessageList