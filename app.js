import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express();
const port = process.env.PORT || 3000;


import supabaseClient from '@supabase/supabase-js'
const supabaseURL = 'https://mncbchpqycgzyhdhxaoc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uY2JjaHBxeWNnenloZGh4YW9jIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMjkzMjIxMywiZXhwIjoyMDE4NTA4MjEzfQ.3z8CXQAJMLY57iT4MZaj-aJtYCxv5u69b9OLpiV5AwU';
const supabase = supabaseClient.createClient(supabaseURL, supabaseKey);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());

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

app.post('/', async (req, res) => {
    console.log('Adding Recipe...')

    var mealType = req.body.mealType;
    var cuisineType = req.body.cuisineType;

    const {data, error} = await supabase
        .from('cuisines')
        .insert([
            {'cuisineType': cuisineType, 'mealType': mealType}
        ])
        .select();

    console.log(data)
    res.header('Content-type', 'application/json')
    res.send(data)
})


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});