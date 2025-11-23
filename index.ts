import express from 'express';
import morgan from 'morgan';

const app = express();
const PORT = 3000;

// Logging middleware
app.use(morgan('dev'));

// Middleware to allow JSON body parsing
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('Server is running with pnpm!');
});

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// dsdsa