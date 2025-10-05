const db = require('../db/db');

function getUserHistory(userId) {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT role, message FROM conversations WHERE user_id = ? ORDER BY timestamp ASC',
      [userId],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      }
    );
  });
}

// saving user's message to Database
function saveUserMessage(userId, message) {
  const query = `
    INSERT INTO conversations (user_id, role, message) VALUES (?, ?, ?)`;
  db.run(query, [userId, 'user', message], (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('User messaged saved successfully');
    }
  });
}

// saving agent's message
function saveAgentMessage(userId, aimessage) {
  const query = `
    INSERT INTO conversations (user_id, role, message) VALUES (?, ?, ?)`;
  db.run(query, [userId, 'assistant', aimessage], (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('AI agent message saved successfully');
    }
  });
}

function createUser(alias, gender) {
  const query = `INSERT INTO users (alias, gender) VALUES (?, ?)`;

  db.run(query, [alias, gender], (err) => {
    if (err) {
      console.error({ message: 'Failed to create user' });
    } else {
      console.log('User Created Successfully');
    }
  });
}

module.exports = {
  getUserHistory,
  saveAgentMessage,
  saveUserMessage,
  createUser,
};
