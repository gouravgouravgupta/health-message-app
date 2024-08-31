// components/MessageItem.js
'use client'; // Add this directive at the top

import styles from '../styles/MessageItem.module.css';

export default function MessageItem({ message, onClick }) {
  return (
    <div className={styles.messageItem} onClick={onClick}>
      <h2>{message.title}</h2>
      <p>{message.text}</p>
    </div>
  );
}
