import app from './app.js';
import { connectToDb } from './src/db/connect.js';

console.log('Step 1: server.js is running');

const PORT = process.env.PORT;

console.log('Step 2: PORT is', PORT);

if (!PORT) {
  throw new Error('PORT is not defined. Check your .env file.');
}

const startServer = async () => {
  try {
    console.log('Step 3: Connecting to MongoDB...');

    await connectToDb();

    console.log('Step 4: MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`Step 5: Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

await startServer();