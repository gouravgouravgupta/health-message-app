// app/page.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MessageList from '../components/MessageList';
import Notification from '../components/Notification';
import styles from './page.module.css';

 function Home() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [messages, setMessages] = useState([]);
  const [notification, setNotification] = useState('');
  const [newMessage, setNewMessage] = useState({ title: '', text: '' });

  useEffect(() => {
    axios.get('/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios.get(`/api/messages?category=${selectedCategory}`)
        .then(response => setMessages(response.data))
        .catch(error => console.error('Error fetching messages:', error));
    }
  }, [selectedCategory]);

  const handleMessageClick = (message) => {
    setNotification(`Notification: ${message.text}`);
  };

  const handleFormChange = (e) => {
    setNewMessage({ ...newMessage, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.title || !newMessage.text) {
      setNotification('Please fill out both fields.');
      return;
    }
    axios.post('/api/messages', { category: selectedCategory, ...newMessage })
      .then(response => {
        setMessages([...messages, response.data]);
        setNewMessage({ title: '', text: '' });
        setNotification('Message submitted successfully.');
      })
      .catch(error => setNotification('Error submitting message.'));
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>Health Message Management</h1>
          <p>Select a category to view messages or submit a new message.</p>
        </div>

        <div className={styles.categories}>
          {categories.map(category => (
            <button key={category} onClick={() => setSelectedCategory(category)}>
              {category}
            </button>
          ))}
        </div>

        <MessageList messages={messages} onMessageClick={handleMessageClick} />

        <div className={styles.messageForm}>
          <h2>Submit a New Message</h2>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Message Title"
              value={newMessage.title}
              onChange={handleFormChange}
            />
            <textarea
              name="text"
              placeholder="Message Text"
              rows="4"
              value={newMessage.text}
              onChange={handleFormChange}
            />
            <button type="submit">Submit Message</button>
          </form>
        </div>

        {notification && <Notification message={notification} />}
      </main>
      <Footer />
    </div>
  );
}
