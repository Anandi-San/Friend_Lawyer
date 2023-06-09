// import { useEffect, useRef, useState } from "react"
// import socketIOClient from 'socket.io-client'

// const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"
// const SOCKET_SERVER_URL = "http://localhost:4000"

// const useChat = (disscussionId) => {
//     const [messages, setMessages] = useState ([])
//     const socketRef = useRef()

//     useEffect(() => {
//         socketRef.current.on = socketIOClient(SOCKET_SERVER_URL, {
//             query:{disscussionId},
//         })

//         socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
//             const incomingMessage = {
//                 ...message,
//                 ownedByCurrentUser:message.senderId == socketRef.current.id
//             }
//             setMessages((messages) => [...messages,incomingMessage])
//         })

//         return () => {
//             socketRef.current.disconnect()
//         }
//     }, [disscussionId])
//     const sendMessage = (messageBody) => {
//         socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
//             body:messageBody,
//             senderId:socketRef.current.id
//         })
//     }
//     return {messages, sendMessage}
// }

// export default useChat;