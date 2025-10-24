import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Url } from './models/Url.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const BITLY_APIKEY = process.env.APIKEY;

app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error', err));

app.post('/shorten', async (req, res) => {
  let { url } = req.body;
  if (!url) return res.json({ error: 'URL is required' });

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  try {
    const existing = await Url.findOne({longUrl: url});
    if (existing) return res.json({shortUrl: existing.shortUrl});
    
    const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${BITLY_APIKEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ long_url: url })
    });

    const data = await response.json();
    console.log(data);

    if (!data.link) {
      return res.json({error: data.description})
    }

    //save new Url in MongoDB
    const newUrl = new Url({ longUrl: url, shortUrl: data.link });
    await newUrl.save();

    res.json({ shortUrl: data.link });
  } catch (err) {
    console.error(err);
    res.json({ error: 'Failed to shorten URL' });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
