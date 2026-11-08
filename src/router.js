import express from 'express';
import {
  getBooksHandler,
  getBookByIdHandler
} from './controllers/books.js';
import {
  getAllAuthors,
  getAuthorById,
  createAuthorHandler,
  updateAuthorHandler,
  deleteAuthorHandler,
} from './controllers/authors.js';

const router = express.Router();

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: Successfully retrieved all books.
 *       500:
 *         description: Internal server error.
 */
router.get('/books', getBooksHandler);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the book.
 *     responses:
 *       200:
 *         description: Successfully retrieved the requested book.
 *       404:
 *         description: Book not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/books/:id', getBookByIdHandler);

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: Successfully retrieved all authors.
 *       500:
 *         description: Internal server error.
 */
router.get('/authors', getAllAuthors);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author retrieved successfully.
 *       404:
 *         description: Author not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/authors/:id', getAuthorById);

/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create an author
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: number
 *             example:
 *               id: a4
 *               name: George Orwell
 *               birthYear: 1903
 *     responses:
 *       201:
 *         description: Author created successfully.
 *       400:
 *         description: Invalid or duplicate author data.
 *       500:
 *         description: Internal server error.
 */
router.post('/authors', createAuthorHandler);

/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     summary: Replace an author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthYear
 *             properties:
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: number
 *             example:
 *               name: George Orwell
 *               birthYear: 1903
 *     responses:
 *       200:
 *         description: Author updated successfully.
 *       400:
 *         description: Invalid author data.
 *       404:
 *         description: Author not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/authors/:id', updateAuthorHandler);

/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Author deleted successfully.
 *       404:
 *         description: Author not found.
 *       409:
 *         description: Cannot delete an author referenced by books.
 *       500:
 *         description: Internal server error.
 */
router.delete('/authors/:id', deleteAuthorHandler);

export default router;