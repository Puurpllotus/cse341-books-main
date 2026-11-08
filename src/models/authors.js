import { getDb } from '../db/connect.js';

const getAllAuthors = async () => {
  const database = getDb();
  const collection = database.collection('authors');
  const authors = await collection.find({}).toArray();

  return authors;
};

const getAuthorById = async (id) => {
  const database = getDb();
  const collection = database.collection('authors');
  const author = await collection.findOne({ id });

  return author;
};

const createAuthor = async (author) => {
  const database = getDb();
  const collection = database.collection('authors');
  const result = await collection.insertOne(author);

  return result;
};

const updateAuthor = async (id, author) => {
  const database = getDb();
  const collection = database.collection('authors');
  const result = await collection.replaceOne({ id }, author);

  return result;
};

const deleteAuthor = async (id) => {
  const database = getDb();
  const collection = database.collection('authors');
  const result = await collection.deleteOne({ id });

  return result;
};

const authorHasBooks = async (id) => {
  const database = getDb();
  const collection = database.collection('books');
  const book = await collection.findOne({ authorId: id });

  return Boolean(book);
};

export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  authorHasBooks,
};