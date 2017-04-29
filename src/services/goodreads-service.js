var http = require("http");
var xml2js = require("xml2js");
var parser = xml2js.Parser({explicitArray: false});

module.exports = function () {

    return {
        getOne: getOne
    }

    function getOne(search, callback) {

        var options = {
            host: 'www.goodreads.com',
            path: '/book/title.xml?key=hgfCpYetThcWyR9Ru606bw&author=' + encodeURIComponent(search.author) + '&title=' + encodeURIComponent(search.title)
        };
        http.request(options, (res) => {
            var str = '';
            res.on('data', (chunck) => {str += chunck});
            res.on('end', () => {
                parser.parseString(str, (err, result) => {
                    callback(null, result.GoodreadsResponse.book);
                });
            });
        }).end();
    }
};