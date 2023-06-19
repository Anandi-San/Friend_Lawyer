import React, { useEffect, useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

function RoomChat() {
  const [pesan, setPesan] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [discussion, setDiscussion] = useState([]);

  useEffect(() => {
    getDiscussions();
    getMessageByDiscussion();
    getUsers();
    startPolling();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    const url = window.location.href;
    const discussionId = url.split("/").pop();
    try {
      const newMessage = {
        pesan: pesan,
        userId: users.userId,
        discussionId: discussionId,
      };
      await axios.post(`http://localhost:5000/message/${discussionId}`, newMessage);
      setMessages([...messages, newMessage]);
      setPesan("");
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };

  const handleChange = (value) => {
    setPesan(value);
  };

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    const User = response.data;
    setUsers(User);
  };

  const getDiscussions = async () => {
    const url = window.location.href;
    const discussionId = url.split("/").pop();

    try {
      const response = await axios.get(
        `http://localhost:5000/discussion/${discussionId}`,
      );
      const { title, content } = response.data;
      setDiscussion({ title, content, discussionId });
    } catch (error) {
      console.error("Error fetching discussion:", error);
    }
  };

  const getMessageByDiscussion = async () => {
    const url = window.location.href;
    const discussionId = url.split("/").pop();
    try {
      const response = await axios.get(
        `http://localhost:5000/discussionmessage/${discussionId}`,
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const startPolling = () => {
    const interval = setInterval(() => {
      getMessageByDiscussion();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  };

  const dateFormatter = (dateString) => {
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: "Asia/Makassar",
    };

    const formattedDate = new Intl.DateTimeFormat("id-ID", options).format(date);
    return formattedDate;
  };

  return (
    <div className="bg-[#1E252B] min-h-screen p-8">
    <div className="container mt-3">
    <div className="flex justify-center">
      <div className="bg-[#262D34] text-white rounded-full p-4 mb-4 " style={{ display: 'inline-block' }}>
        <p className="text-2xl font-bold">Forum Diskusi</p>
      </div>
    </div>
      <div className=" rounded-lg text-white p-4 mt-4 bg-[#262D34] p-4 ">
      <p className="text-center text-2xl font-bold">{discussion.title}</p>
        <p className="text-justify p-5">{discussion.content}</p>
        <p className="mt-3">
          <span className="flex items-center">
            <AiFillMessage className="text-xl mr-2" />
            <span className="text-lg">{messages[0]?.messages?.length}</span>
            <span className="text-lg ml-1">Jawaban</span>
          </span>
        </p>
      </div>
      <div className="rounded-textarea mt-4 bg-[#262D34] text-white">
        <ReactQuill
          className="rounded h-32 "
          value={pesan}
          onChange={handleChange}
          formats={["bold", "italic", "underline", "link", "list", "bullet"]}
          style={{ color: "#FFFFFF" }}
        />
      </div>
      <div className="flex flex-col items-end mt-10">
        <button
          className="bg-blue-500 text-white rounded-full px-6 py-2 mt-3 text-lg"
          type="submit"
          onClick={handleSubmit}
        >
          Kirim
        </button>
        <hr className="border-t mt-3" />
      </div>

      <div className="mt-8">
        {messages[0]?.messages?.map((message, index) => (
          <div key={index} className="bg-[#262D34] text-white text-xl rounded-lg p-4 mb-4">
            <div className="font-bold">{message.user.name}</div>
            <div className="mb-2" dangerouslySetInnerHTML={{ __html: message.pesan }}></div>
            <div className="text-sm text-gray-500">{dateFormatter(message.updatedAt)}</div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default RoomChat;
