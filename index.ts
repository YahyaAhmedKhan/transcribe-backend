import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import transcribeRoutes from './routes/transcribe.routes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_URL = process.env.FRONTEND_URL;
console.log('FRONTEND_URL:', FRONTEND_URL); 

// CORS Configuration
const corsOptions = NODE_ENV === 'production'
  ? {
      origin: FRONTEND_URL,
      credentials: true,
      optionsSuccessStatus: 200
    }
  : {
      origin: '*', // Allow all origins in development
      credentials: true,
      optionsSuccessStatus: 200
    };

app.use(cors(corsOptions));

// Logging middleware
app.use(morgan('dev'));

// Middleware to allow JSON body parsing
app.use(express.json());

// Routes
app.use('/transcribe', transcribeRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('Server is running with pnpm!');
});

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});