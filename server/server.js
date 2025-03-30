// ThinkFlow API Server
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'ThinkFlow API is running' });
});

// Sample API endpoint
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the ThinkFlow API!' });
});

// Decision Matrix API - placeholder for actual implementation
app.get('/api/decisions', (req, res) => {
  res.json([
    {
      id: '1',
      title: 'Sample Decision',
      description: 'This is a sample decision',
      status: 'In Progress'
    }
  ]);
});

// Start the server
app.listen(PORT, () => {
  console.log(`ThinkFlow server running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/api/health`);
}); 