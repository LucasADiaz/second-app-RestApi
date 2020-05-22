const { Router } = require('express');
const router = Router();
const _ = require('lodash');


//traigo los datos del sample.json
const books = require('../src/books.json');
const authors = require('../src/authors.json');


// Responde a get all books whit their authors
router.get('/', (req, res) => {
    const booksWhitAuthots = [];
    _.each(books, (book) => {
        _.each(authors, (author) => {
            if (book.authorId == author.id) {
                booksWhitAuthots.push({ id: book.id, name: book.name, authorId: {...author } });
            }
        });
    });
    res.json(booksWhitAuthots);
});

router.post('/', (req, res) => {
    const { name, authorId } = req.body;
    if (name && authorId) {
        _.each(authors, (author, i) => {
            if (author.id == authorId) {
                const id = `${books.length + 1}`;
                const newBook = { id, ...req.body };
                books.push(newBook);
                res.json({ 'mensaje': ' successful! the book is create' });
            }
        });
        res.status(404).json({ error: "no existe ese autor" });
    } else {
        res.status(500).json({ error: "there was error" });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    longitudOriginal = books.length;
    _.remove(books, (book, i) => {
        return book.id == id;
    });
    if (books.length === longitudOriginal) {
        res.status(400).json({ error: "do not exist that id" });
    } else {
        res.send(books);
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, authorId } = req.body;

    if (name && authorId) {
        _.each(books, (book) => {
            if (book.id == id) {
                _.each(authors, (author) => {
                    if (author.id == authorId) {
                        book.name = name;
                        book.authorId = authorId;
                        res.json(book);
                    }
                });
                res.status(404).json({ error: "author do not exist" });
            }
        });
        res.status(404).json({ 'statusCode': "book do not exist" });
    } else {
        res.status(400).json({ 'statusCode': 'Bad request' });
    }
});



module.exports = router;