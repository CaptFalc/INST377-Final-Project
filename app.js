import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '/public')));

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root : __dirname
  })

});
app.get('/about', (req, res) => {
  res.sendFile('public/about.html', {
    root : __dirname
  })
  
});
app.get('/doc', (req, res) => {
  res.sendFile('public/doc.html', {
    root : __dirname
  })
  
});
app.get('/contact', (req, res) => {
  res.sendFile('public/contact.html', {
    root : __dirname
  })
  
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});