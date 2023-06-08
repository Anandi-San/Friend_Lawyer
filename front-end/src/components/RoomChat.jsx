import React, { useEffect, useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

function RoomChat() {
  const [pesan, setPesan] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([])
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
      setMessages([...messages,newMessage]);
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
    // console.log(User)
    setUsers(User);
  };

  const getDiscussions = async () => {
    const url = window.location.href;
    const discussionId = url.split("/").pop(); // Mengambil ID diskusi dari URL terakhir

    try {
      const response = await axios.get(
        `http://localhost:5000/discussion/${discussionId}`,
      );
      const { title, content } = response.data; // Ganti dengan nama kolom yang diinginkan
      setDiscussion({ title, content, discussionId });
      // console.log(title, content, discussionId )
    } catch (error) {
      console.error("Error fetching discussion:", error);
    }
  };

  const getMessageByDiscussion = async () => {
    const url = window.location.href;
    const discussionId = url.split("/").pop(); // Mengambil ID diskusi dari URL terakhir
    try {
      const response = await axios.get(
        `http://localhost:5000/discussionmessage/${discussionId}`,
      );
      setMessages(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const startPolling = () => {
    const interval = setInterval(() => {
      getMessageByDiscussion();
    }, 5000); // Mengambil data pesan setiap 5 detik (atur sesuai kebutuhan Anda)

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

    const formattedDate = new Intl.DateTimeFormat("id-ID", options).format(
      date,
    );
    return formattedDate;
  };

  return (
    <div className="container mt-3">
      <p style={{ textAlign: "center", fontSize: "24px" }}>
        {discussion.title}
      </p>
      <div className="box">
        <p style={{ textAlign: "justify" }}>{discussion.content}</p>
        <p className="mt-3">
        <span className="is-flex is-align-items-center">
          <AiFillMessage className="is-size-4 mr-2" />
          <span className="is-size-5">{messages[0]?.messages?.length}</span>
          <span className="is-size-5 ml-1">Jawaban</span>
        </span>
        </p>
      </div>
      <div className="rounded-textarea">
        <ReactQuill
          className="is-rounded"
          value={pesan}
          onChange={handleChange}
          formats={["bold", "italic", "underline", "link", "list", "bullet"]}
        />
      </div>
      <div className="button-container">
        <button
          className="button is-info is-pulled-right mt-3 is-rounded is-medium"
          type="submit"
          onClick={handleSubmit}>
          Kirim
        </button>
        <hr className="is-underlined" />
      </div>

      {/* isi dengan jawaban message dan aturan pesan ya */}
      <div className="answer-box">
        {messages[0]?.messages?.map((message, index) => (
          <div key={index} className="answer box">
            <div className="answer-user">{message.user.name}</div>
            <div
              className="answer-message"
              dangerouslySetInnerHTML={{
                __html: message.pesan,
              }}></div>
            <div className="answer-timestamp">
              {dateFormatter(message.updatedAt)}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .rounded-textarea .ql-editor {
          min-height: 100px;
          border-radius: 10px;
        }

        .is-underlined {
          border-top: 1px solid #000000;
          width: 100%;
          margin-top: 10px;
        }

        .button-container {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .answer-box {
          margin-top: 20px;
        }

        .answer {
          margin-bottom: 10px;
        }

        .answer-user {
          font-weight: bold;
        }

        .answer-message {
          margin-bottom: 5px;
        }

        .answer-timestamp {
          color: #888888;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}

export default RoomChat;
