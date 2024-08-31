// components/MessageList.js
'use client'; // Add this directive at the top

import MessageItem from './MessageItem';
import styles from '../styles/MessageList.module.css';

export default function MessageList({ messages, onMessageClick }) {
  return (
    <div className={styles.messageList}>
      {messages.map(message => (
        <MessageItem key={message.id} message={message} onClick={() => onMessageClick(message)} />
      ))}
    </div>
  );
}
