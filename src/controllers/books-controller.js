var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var connectionString = 'mongodb://localhost:27017/bookAPI';

module.exports = function (bookService, nav) {

    return {
        getAll: getAll,
        getOneById: getOneById,
    }

    function getAll(req, res) {
        mongo.connect(connectionString, (err, db) => {
            var collection = db.collection("books");
            collection.find({}).toArray((err, results) => {
                res.render('books', {nav: nav, books: results});
                db.close();
            });
        });   
    }

    function getOneById(req, res) {
        mongo.connect(connectionString, (err, db) => {
            var id = objectId(req.params.book_id);
            var collection = db.collection("books");
            collection.findOne({"_id": id}, (err, results) => {
                bookService.getOne({author:results.author, title:results.title}, (err, bookExtras) => {
                    results.bookExtras = bookExtras;
                    res.render('book', {nav: nav, book: results});
                    db.close();
                });
            });
        });
    }
}