import { useState, useRef, useEffect } from 'react';
import style from './AI.module.css';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const MAX_TEXT_LIMIT = 1000;

export default function AI() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [messageLength, setMessageLength] = useState(0);
  const [lastSender, setLastSender] = useState('');
  const endMessageRef = useRef(null);

  const newMessage = (message, sender) => {
    const messageObj = {
      content: message,
      sender: sender,
      time: new Date()
    }
    setMessages([...messages, messageObj]);
    setLastSender(sender);
  }

  const handleMessageSend = (e) => {
    e.preventDefault();

    if (inputMessage.length === 0)
      return;

    if (inputMessage.length > MAX_TEXT_LIMIT)
      return;

    newMessage(inputMessage, 'user');
    setInputMessage('');
    setMessageLength(0);
  }

  const handleMessageUpdate = (e) => {
    const messageValue = e.target.value;
    setMessageLength(messageValue.length);
    setInputMessage(messageValue);
  }

  const renderMessages = () => {
    if (messages.length === 0) {
      return (
        <p className={style.startAskingText}>Start Asking!</p>
      )
    }

    if (lastSender === 'user') {
      newMessage('AI response or something', 'ai');
    }

    const mappedMessages = messages.map((message, index) => {
      const messageStyle = message.sender === 'user' ? style.userMessage : style.aiMessage;
      
      return (
        <div key={index} className={`${style.messageBox} ${messageStyle}`}>
          <p>{message.content}</p>
          <p className={`${style.messageTime} ${messageStyle}`}>{dayjs(message.date).format('h:mm A')}</p>
        </div>
      )
    });

    return mappedMessages;
  }

  useEffect(() => {
    if (endMessageRef.current) {
      endMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages])

  return (
    <>
      <div id='messages' className={style.messagesContainer}>
        {renderMessages()}
        <div ref={endMessageRef} />
      </div>
      <form onSubmit={handleMessageSend} className={style.messageContainer}>
        <div className={style.inputBoxContainer}>
          <input maxLength={MAX_TEXT_LIMIT} value={inputMessage} onChange={(e) => handleMessageUpdate(e)} className={style.messageInput} placeholder='Ask a question'/>
          <p className={`${style.textLimitText} ${messageLength >= MAX_TEXT_LIMIT ? style.textLimitReached : ''}`}>{messageLength}/{MAX_TEXT_LIMIT}</p>
        </div>
        <button type='submit' className={style.sendButton}>Send</button>
      </form>
    </>
  )
}