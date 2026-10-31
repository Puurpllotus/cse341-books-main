import app from './app.js';

const PORT = process.env.PORT;

if (!PORT) {
throw new Error('PORT environment variable is missing. Check your .env file.');
}

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
