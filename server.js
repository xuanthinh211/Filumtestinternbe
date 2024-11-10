const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors({
  origin: 'https://filumtestintern.vercel.app' // Cấu hình CORS cho phép frontend từ Vercel
}));

// Thêm endpoint xử lý GET tại '/'
app.get('/', (req, res) => {
  res.send('Backend is running!'); // Hoặc bạn có thể trả về HTML, JSON nếu cần
});

app.post('/save-result', (req, res) => {
  console.log('Received request:', req.body);
  const result = req.body;
  const filePath = path.join(__dirname, 'result.json');

  fs.writeFile(filePath, JSON.stringify(result, null, 2), (err) => {
    if (err) {
      console.error('Error saving file:', err);
      return res.status(500).json({ message: 'Error saving file' });
    }
    console.log('File saved successfully');
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
