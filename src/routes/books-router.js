var express = require('express');

function router(nav) {

    var booksService = require('../services/goodreads-service')();
    var booksController = require('../controllers/books-controller')(booksService, nav);

    var booksRouter = express.Router();

    booksRouter.route('/books')
        .get(booksController.getAll);

    booksRouter.route('/books/:book_id')
        .get(booksController.getOneById);

    return booksRouter;
}

module.exports = router;