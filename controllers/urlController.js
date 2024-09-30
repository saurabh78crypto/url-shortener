import Url from '../models/Url.js';
import { nanoid } from 'nanoid';
import redisClient from '../utils/redisClient.js';

const createShortUrl = async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL;

  try {
    let url = await Url.findOne({ longUrl });
    if (url) return res.status(200).json({ status: true, data: url });

    const urlCode = nanoid(6);
    const shortUrl = `${baseUrl}/${urlCode}`;

    url = new Url({ longUrl, shortUrl, urlCode });
    await url.save();
    
    redisClient.set(urlCode, longUrl);  // Cache in Redis
    
    res.status(201).json({ status: true, data: { longUrl, shortUrl, urlCode } });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

const redirectUrl = async (req, res) => {
  const { urlCode } = req.params;
  console.log(`Redirecting URL with code: ${urlCode}`);

  try {
    let longUrl = await redisClient.get(urlCode);
    if (!longUrl) {
      const url = await Url.findOne({ urlCode });
      if (!url) {
        console.log('URL not found in DB'); 
        return res.status(404).json({ status: false, message: 'URL not found' });
      }

      longUrl = url.longUrl;
      redisClient.set(urlCode, longUrl);
    }

    res.redirect(longUrl);
  } catch (error) {
    console.error('Error redirecting URL:', error);
    res.status(500).json({ status: false, message: 'Server Error' });
  }
};

export { createShortUrl, redirectUrl}