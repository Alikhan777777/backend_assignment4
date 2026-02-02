const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authenticate, authorizeAdmin } = require('../middleware/authMiddleware');

// Public Route [cite: 21]
router.get('/', bookController.getAllBooks);

// Protected Admin Routes [cite: 23, 24]
router.post('/', authenticate, authorizeAdmin, bookController.createBook);
router.put('/:id', authenticate, authorizeAdmin, bookController.updateBook);
router.delete('/:id', authenticate, authorizeAdmin, bookController.deleteBook);

module.exports = router;