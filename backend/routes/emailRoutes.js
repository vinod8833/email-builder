const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const EmailTemplate = require('../models/EmailTemplate');
const router = express.Router();

// Image upload setup
const upload = multer({ dest: 'uploads/' });

// API to get email layout HTML
router.get('/getEmailLayout', (req, res) => {
  const layoutPath = path.join(__dirname, '../layout.html');
  fs.readFile(layoutPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error loading layout.');
    }
    res.send(data);
  });
});

// API to upload an image
router.post('/uploadImage', upload.single('image'), (req, res) => {
  if (req.file) {
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  } else {
    res.status(400).send('No file uploaded.');
  }
});

// API to store email template configuration
router.post('/uploadEmailConfig', (req, res) => {
  const { title, content, footer, imageUrls, textColor, fontSize } = req.body;
  const newTemplate = new EmailTemplate({
    title,
    content,
    footer,
    imageUrls,
    textColor,
    fontSize,
  });

  newTemplate.save()
    .then((template) => res.json(template))
    .catch((err) => res.status(500).send('Error saving email template.'));
});

// API to render and download the email template
router.post('/renderAndDownloadTemplate', (req, res) => {
  const { layout, title, content, footer, imageUrls, textColor, fontSize } = req.body;
  
  let customizedLayout = layout.replace('{{title}}', title)
    .replace('{{content}}', content)
    .replace('{{footer}}', footer)
    .replace('{{textColor}}', textColor)
    .replace('{{fontSize}}', fontSize)
    .replace('{{imageUrls}}', imageUrls.join(', '));

  res.setHeader('Content-Type', 'text/html');
  res.send(customizedLayout);
});

module.exports = router;
