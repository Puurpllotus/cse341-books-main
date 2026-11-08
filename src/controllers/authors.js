import {
  getAllAuthors as getAllAuthorsFromDb,
  getAuthorById as getAuthorByIdFromDb,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  authorHasBooks,
} from '../models/authors.js';

const getAllAuthors = async (req, res) => {
  try {
    const authors = await getAllAuthorsFromDb();

    return res.status(200).json(authors);
  } catch (error) {
    console.error('Error retrieving authors:', error);

    return res.status(500).json({
      message: 'Unable to retrieve authors.',
    });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const author = await getAuthorByIdFromDb(req.params.id);

    if (!author) {
      return res.status(404).json({
        message: 'Author not found.',
      });
    }

    return res.status(200).json(author);
  } catch (error) {
    console.error('Error retrieving author:', error);

    return res.status(500).json({
      message: 'Unable to retrieve author.',
    });
  }
};

const createAuthorHandler = async (req, res) => {
  try {
    const { id, name, birthYear } = req.body ?? {};

    if (
      typeof id !== 'string' ||
      typeof name !== 'string' ||
      typeof birthYear !== 'number'
    ) {
      return res.status(400).json({
        message: 'Author must include a string id, string name, and numeric birthYear.',
      });
    }

    const existingAuthor = await getAuthorByIdFromDb(id);

    if (existingAuthor) {
      return res.status(400).json({
        message: 'An author with this ID already exists.',
      });
    }

    const author = { id, name, birthYear };

    await createAuthor(author);

    return res.status(201).json(author);
  } catch (error) {
    console.error('Error creating author:', error);

    return res.status(500).json({
      message: 'Unable to create author.',
    });
  }
};

const updateAuthorHandler = async (req, res) => {
  try {
    const { name, birthYear } = req.body ?? {};

    if (
      typeof name !== 'string' ||
      typeof birthYear !== 'number'
    ) {
      return res.status(400).json({
        message: 'Author must include a string name and numeric birthYear.',
      });
    }

    const author = {
      id: req.params.id,
      name,
      birthYear,
    };

    const result = await updateAuthor(req.params.id, author);

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: 'Author not found.',
      });
    }

    return res.status(200).json(author);
  } catch (error) {
    console.error('Error updating author:', error);

    return res.status(500).json({
      message: 'Unable to update author.',
    });
  }
};

const deleteAuthorHandler = async (req, res) => {
  try {
    const author = await getAuthorByIdFromDb(req.params.id);

    if (!author) {
      return res.status(404).json({
        message: 'Author not found.',
      });
    }

    const hasBooks = await authorHasBooks(req.params.id);

    if (hasBooks) {
      return res.status(409).json({
        message: 'Cannot delete an author who has books.',
      });
    }

    const result = await deleteAuthor(req.params.id);

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'Author not found.',
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting author:', error);

    return res.status(500).json({
      message: 'Unable to delete author.',
    });
  }
};

export {
  getAllAuthors,
  getAuthorById,
  createAuthorHandler,
  updateAuthorHandler,
  deleteAuthorHandler,
};