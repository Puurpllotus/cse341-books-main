import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  authorExists,
} from '../models/books.js';

const getBooksHandler = async (req, res) => {
  try {
    const books = await getAllBooks();

    return res.status(200).json(books);
  } catch (error) {
    console.error('Error retrieving books:', error);

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const getBookByIdHandler = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await getBookById(bookId);

    if (!book) {
      return res.status(404).json({
        message: 'Book not found',
      });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error('Error retrieving book:', error);

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const createBookHandler = async (req, res) => {
  try {
    const { id, authorId, title, publicationDate } = req.body;

    if (
      !id ||
      !authorId ||
      !title ||
      !publicationDate ||
      typeof id !== 'string' ||
      typeof authorId !== 'string' ||
      typeof title !== 'string' ||
      typeof publicationDate !== 'string'
    ) {
      return res.status(400).json({
        message: 'All book fields are required and must be strings',
      });
    }

    const existingBook = await getBookById(id);

    if (existingBook) {
      return res.status(400).json({
        message: 'A book with this ID already exists',
      });
    }

    const validAuthor = await authorExists(authorId);

    if (!validAuthor) {
      return res.status(400).json({
        message: 'Author not found',
      });
    }

    await createBook({ id, authorId, title, publicationDate });

    return res.status(201).json({
      id,
      authorId,
      title,
      publicationDate,
    });
  } catch (error) {
    console.error('Error creating book:', error);

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const updateBookHandler = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { authorId, title, publicationDate } = req.body;

    if (
      !authorId ||
      !title ||
      !publicationDate ||
      typeof authorId !== 'string' ||
      typeof title !== 'string' ||
      typeof publicationDate !== 'string'
    ) {
      return res.status(400).json({
        message: 'All book fields are required and must be strings',
      });
    }

    const existingBook = await getBookById(bookId);

    if (!existingBook) {
      return res.status(404).json({
        message: 'Book not found',
      });
    }

    const validAuthor = await authorExists(authorId);

    if (!validAuthor) {
      return res.status(400).json({
        message: 'Author not found',
      });
    }

    await updateBook(bookId, {
      id: bookId,
      authorId,
      title,
      publicationDate,
    });

    return res.status(200).json({
      id: bookId,
      authorId,
      title,
      publicationDate,
    });
  } catch (error) {
    console.error('Error updating book:', error);

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const deleteBookHandler = async (req, res) => {
  try {
    const bookId = req.params.id;
    const existingBook = await getBookById(bookId);

    if (!existingBook) {
      return res.status(404).json({
        message: 'Book not found',
      });
    }

    await deleteBook(bookId);

    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting book:', error);

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export {
  getBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler,
};