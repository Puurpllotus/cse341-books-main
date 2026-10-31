import express from 'express';

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Root route
app.get('/', (req, res) => {
return res.status(200).json({ message: 'Welcome to my CSE 341 application!' });
});

// Export the app
export default app;
