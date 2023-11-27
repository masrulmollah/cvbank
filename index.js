const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/upload', upload.single('resume'), (req, res) => {
  res.send('Resume uploaded successfully!');
});

let comments = [];

app.post('/comment', (req, res) => {
  const comment = req.body.comment;
  comments.push(comment);
  res.send('Comment added successfully!');
});

app.get('/comments', (req, res) => {
  res.json(comments);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
