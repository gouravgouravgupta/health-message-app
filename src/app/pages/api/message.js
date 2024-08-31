// pages/api/messages.js
let messages = {
    'General Health': [
      { id: '1', title: 'Health Check-Up', text: 'Schedule your annual health check-up.' },
      { id: '2', title: 'Vaccination Reminder', text: 'Don’t forget to get your flu vaccine.' },
    ],
    'Mental Health': [
      { id: '3', title: 'Counseling Session', text: 'Consider scheduling a session with a counselor.' },
      { id: '4', title: 'Stress Management Tips', text: 'Read tips on managing stress effectively.' },
    ],
    // Add more categories and messages as needed
  };
  
  export default function handler(req, res) {
    if (req.method === 'GET') {
      const { category } = req.query;
      res.status(200).json(messages[category] || []);
    } else if (req.method === 'POST') {
      const { category, title, text } = req.body;
      if (!messages[category]) {
        messages[category] = [];
      }
      const newMessage = { id: (Date.now()).toString(), title, text };
      messages[category].push(newMessage);
      res.status(201).json(newMessage);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  