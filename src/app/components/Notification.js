// components/Notification.js
'use client'; // Add this directive at the top

import styles from '../styles/Notification.module.css';

export default function Notification({ message }) {
  return (
    <div className={styles.notification}>
      <p>{message}</p>
    </div>
  );
}
