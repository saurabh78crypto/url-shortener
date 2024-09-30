import express from 'express';
import { createShortUrl, redirectUrl } from '../controllers/urlController.js';
const router = express.Router();

router.post('/shorten', createShortUrl);
router.get('/:urlCode', redirectUrl);

export default router;
