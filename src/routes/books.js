const { Router } = require('express');
const router = Router();
const _ = require('lodash');
const bookService = require('../services/books')
const { ErrorNotFound, ErrorUsed, ErrorBadRequest } = require('../error/error');

//traigo los datos del sample.json
const books = require('../books.json');
const authors = require('../authors.json');


// Responde a get all books whit their authors
router.get('/', (req, res) => {
    const booksWhitAuthots = bookService.getBooksWithAuthors();
    res.json(booksWhitAuthots);
});


router.post('/', (req, res) => {
    try {
        bookService.create(req.body);
        res.status(201).json({
            message: `You have successfully create the book`,
            data: books,
        });
    } catch (error) {
        if (error instanceof ErrorNotFound) {
            res.status(400).json({
                message: error.message
            });
        }
        if (error instanceof ErrorBadRequest) {
            res.status(404).json({
                message: error.message
            });
        }
    }

});


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log("1");

    const promesa = new Promise((resolve, reject) => {
        console.log("2");
        const solution = bookService.deleteOne(id);
        resolve(solution);

    }).then(resolve => {
        res.status(201).json({
            message: `You have successfully deleted the book whit id!${id}`,
            data: books,
        });
    }).catch(error => {
        if (error instanceof ErrorUsed) {
            res.status(400).json({
                message: error.message
            });
        }
        if (error instanceof ErrorNotFound) {
            res.status(404).json({
                message: error.message
            });
        }
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    new Promise(resolve => {

        const book = bookService.update(id, req.body);
        if (book) {
            resolve(book);
        }

    }).then(resolve => {
        res.status(201).json({
            message: "You have successfully updated the book!",
            data: resolve,
        });
    }).catch(error => {

        if (error instanceof ErrorUsed) {
            res.status(400).json({
                message: error.message
            });
        }
        if (error instanceof ErrorNotFound) {
            res.status(404).json({
                message: error.message
            });
        }
    });
});



module.exports = router;


// router.post('/', (req, res) => {
//     const { name, authorId } = req.body;
//     if (name && authorId) {
//         _.each(authors, (author, i) => {
//             if (author.id == authorId) {
//                 const id = `${books.length + 1}`;
//                 const newBook = { id, ...req.body };
//                 books.push(newBook);
//                 res.status(201).json({
//                     message: "You have successfully obtained all the resources!",
//                     data: books,
//                 });
//             }
//         });
//         res.status(404).json({ error: "no existe ese autor" });
//     } else {
//         res.status(400).json({ error: "there was error" });
//     }
// });
// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     longitudOriginal = books.length;
//     _.remove(books, (book, i) => {
//         return book.id == id;
//     });
//     if (books.length === longitudOriginal) {
//         res.status(400).json({ error: "do not exist that id" });
//     } else {
//         res.send(books);
//     }
// });
// put
// _.each(books, (book) => {
//     if (book.id == id) {
//         _.each(authors, (author) => {
//             if (author.id == authorId) {
//                 book.name = name;
//                 book.authorId = authorId;
//                 res.json(book);
//             }
//         });
//         res.status(404).json({ error: "author do not exist" });
//     }
// });
// res.status(404).json({ 'statusCode': "book do not exist" });