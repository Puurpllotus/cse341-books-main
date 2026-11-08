import { getDb } from '../db/connect.js';

const getAllBooks = async () => {
  const database = getDb();
  const collection = database.collection('books');
  const books = await collection.find({}).toArray();

  return books;
};

const getBookById = async (bookId) => {
  const database = getDb();
  const collection = database.collection('books');
  const book = await collection.findOne({ id: bookId });

  return book;
};

const createBook = async (book) => {
  const database = getDb();
  const collection = database.collection('books');
  const result = await collection.insertOne(book);

  return result;
};

const updateBook = async (bookId, book) => {
  const database = getDb();
  const collection = database.collection('books');
  const result = await collection.replaceOne({ id: bookId }, book);

  return result;
};

const deleteBook = async (bookId) => {
  const database = getDb();
  const collection = database.collection('books');
  const result = await collection.deleteOne({ id: bookId });

  return result;
};

const authorExists = async (authorId) => {
  const database = getDb();
  const collection = database.collection('authors');
  const author = await collection.findOne({ id: authorId });

  return Boolean(author);
};

export {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  authorExists,
};