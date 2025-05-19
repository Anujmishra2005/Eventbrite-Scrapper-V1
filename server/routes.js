const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/events', (req, res) => {
  const events = require('../data/events.json');
  res.json(events);
});

router.post('/submit-email', (req, res) => {
  const { email, eventUrl } = req.body;
  if (!email || !eventUrl) return res.status(400).send('Missing data');

  const logPath = path.join(__dirname, '../data/emails.json');

  let saved = [];
  if (fs.existsSync(logPath)) {
    saved = JSON.parse(fs.readFileSync(logPath));
  }

  saved.push({ email, eventUrl, timestamp: new Date() });

  fs.writeFileSync(logPath, JSON.stringify(saved, null, 2));
  res.status(200).send('Email saved');
});

module.exports = router;