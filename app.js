var express = require("express");

var app = express();

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

var nav = [
    { link: '/books', text: 'books' },
    { link: '/authors', text: 'authors' }
];

app.get('/', (req, res) => {
    res.render('index', {nav: nav});
});

var booksRouter = require("./src/routes/books-router")(nav);
app.use(booksRouter);

var port = 5000;
app.listen(port, (err) => {
    console.log("server running on port:" + port);
});