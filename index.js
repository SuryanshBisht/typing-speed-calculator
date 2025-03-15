// server/index.js

const url = "https://api.quotable.io/random";
const url2 = 'https://zenquotes.io/api/quotes';
const url3= 'https://animechan.vercel.app/api/random';
const express = require("express");
const cors = require('cors');
const path=require("path");

const PORT = process.env.PORT || 3001;

const app = express();
// Have Node serve the files for our built React app
const allowedOrigins = ["https://api.quotable.io/random", 'https://zenquotes.io/api/quotes','https://animechan.vercel.app/api/random'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.get('/api/quotes', async (req, res) => {
    try {
        const response = await fetch(url2);
        const data = await response.json();
        // console.log(data);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.use(express.static(path.resolve(__dirname, '')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '', 'index.html'));
});
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});