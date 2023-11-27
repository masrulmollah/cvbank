const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Set your destination folder for uploaded resumes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Serve HTML file for uploading resumes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle resume upload
app.post('/upload', upload.single('resume'), (req, res) => {
  res.send('Resume uploaded successfully!');
});

// Handle comments
let comments = []; // Store comments in memory for this example

app.post('/comment', (req, res) => {
  const comment = req.body.comment;
  comments.push(comment);
  res.send('Comment added successfully!');
});

// Retrieve comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
