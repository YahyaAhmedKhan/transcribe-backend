import { Router, Request, Response } from 'express';
import multer from 'multer';
import Transcribe from '../utils/transcribe.js';
import fs from 'fs';
import path from 'path';

const router = Router();

// Configure multer to preserve file extension
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

// POST /transcribe - handles audio file transcription
router.post('/', upload.single('audio'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No audio file provided' });
      return;
    }

    // Transcribe the uploaded audio file
    const transcription = await Transcribe.transcribeAudio(req.file.path);

    // Clean up the uploaded file
    fs.unlinkSync(req.file.path);

    res.json({ 
      success: true, 
      transcription 
    });
  } catch (error) {
    // Clean up file if it exists
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    console.error('Transcription error:', error);
    res.status(500).json({ 
      error: 'Failed to transcribe audio',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
