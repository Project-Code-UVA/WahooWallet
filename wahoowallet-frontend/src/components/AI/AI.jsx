import { useState, useRef, useEffect } from 'react';
import style from './AI.module.css';

export default function AI() {

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [lastSender, setLastSender] = useState('');
  const endMessageRef = useRef(null);

  const newMessage = (message, sender) => {
    const messageObj = {
      content: message,
      sender: sender,
      time: new Date().toISOString()
    }
    setMessages([...messages, messageObj]);
    setLastSender(sender);
  }

  const handleMessageSend = (e) => {
    e.preventDefault();

    if (inputMessage.length === 0)
      return;

    newMessage(inputMessage, 'user');
    setInputMessage('');
  }

  const handleMessageUpdate = (e) => {
    const messageValue = e.target.value;
    setInputMessage(() => messageValue);
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
      return (
        <div key={index} className={`${style.messageBox} ${message.sender === 'user' ? style.userMessage : style.aiMessage}`}>
          <p>{message.content}</p>
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
        <input value={inputMessage} onChange={(e) => handleMessageUpdate(e)} className={style.messageInput} placeholder='Ask a question' />
        <button type='submit' className={style.sendButton}>Send</button>
      </form>
    </>
  )
}