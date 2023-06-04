import React, {useState, useEffect} from 'react'
import axios from 'axios';

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
        await axios.delete(`http://localhost:5000/message/${messageId}`);
        getMessages();
    };

  return (
    <div>
    <h1 className='title'>Message</h1>
    <h2 className='subtitle'>List of Messages</h2>
        <table className='table is-striped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Message</th>
                    <th>Title</th>
                    <th>createdBy</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {messages.map((message, index) => (
                      <tr key={message.uuid}>
                      <td>{index + 1}</td>
                      <td>{message.pesan}</td>
                      <td>{message.discussion.title}</td>
                      <td>{message.user.name}</td>
                      <td>
                        <button onClick={() => deleteMessages(message.uuid)} className='button is-small is-danger' >delete</button>
                      </td>
                  </tr>
                ))}
            </tbody>
        </table>
     </div>
  );
};

export default MessageList