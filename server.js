const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000; // Sử dụng PORT từ môi trường

app.use(bodyParser.json());
app.use(cors({
  origin: 'https://filumtestintern.vercel.app' // Chỉ cho phép truy cập từ URL frontend
}));

app.post('/save-result', (req, res) => {
  console.log('Received request:', req.body); // Log request body
  const result = req.body;
  const filePath = path.join(__dirname, 'result.json');

  fs.writeFile(filePath, JSON.stringify(result, null, 2), (err) => {
    if (err) {
      console.error('Error saving file:', err); // Log error
      return res.status(500).json({ message: 'Error saving file' });
    }
    console.log('File saved successfully'); // Log success
    res.status(200).json({ message: 'File saved successfully' });
  });
});

app.get('/result.json', (req, res) => {
  const filePath = path.join(__dirname, 'result.json');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: 'File not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
