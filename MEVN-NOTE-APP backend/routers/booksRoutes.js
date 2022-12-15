const bookService = require('../service/bookService');
module.exports = function (app, express) {
    let book = express.Router();

    book.post('/add-book', async (req, res) => {
        let response = await bookService.addBook(req.body);
        res.status(response.status).json(response.data);
    });
    book.put('/update', async (req, res) => {
        console.log(req);
        let response = await bookService.update(req.query.id,req.body);
        res.status(response.status).json(response.data);
    });
    book.get('/get-book-list', async (req, res) => {
        let response = await bookService.book_list(req);
        res.status(response.status).json(response.data);
    });
    book.get('/get-book', async (req, res) => {
        let response = await bookService.book_details(req);
        res.status(response.status).json(response.data);
    });
    // book.get('/get-book', async (req, res) => {
    //     let response = await bookService.getBook(req.query._id);
    //     res.status(response.status).json(response.data);
    // });
    // book.post('/search', async (req, res) => {
    //     let response = await bookService.search(req.body);
    //     res.status(response.status).json(response.data);
    // });
    
    return book;
}
