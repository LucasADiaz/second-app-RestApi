const books = require("../books.json");
const { ErrorBadRequest, ErrorNotFound, ErrorUsed } = require('../error/error');
const authorService = require("../services/authors");
const _ = require('lodash');
//para solucionar los id repetidos, se realizo siguienteId
let siguienteId = books.length;

module.exports.create = (body) => {
    const { name, authorId } = body;
    if (name && authorId) {
        const authors = authorService.findAll();
        for (const author of authors) {
            if (author.id == body.authorId) {
                books.push({
                    "id": `${books.length + 1}`,
                    "name": body.name,
                    "authorId": body.authorId
                });
                siguienteId += 1;
                return authors;
            }
        }
        throw new ErrorNotFound(`do not found an author whit that id: ${body.authorId}`);
    } else {
        throw new ErrorBadRequest(`you need to provided a name book and author id`);
    }

}

module.exports.getBooksWithAuthors = () => {
    booksWhitAuthors = [];
    const authors = authorService.findAll();
    _.each(books, (book) => {
        _.each(authors, (author) => {
            if (book.authorId == author.id) {
                booksWhitAuthors.push({
                    ...book,
                    author: {...author }
                });
            }
        });
    });
    return booksWhitAuthors;
};

module.exports.getbooksByAuthor = (id) => {

    // const booksArray = [];
    for (const book of books) {
        if (book.authorId === id) {
            return true;
            // booksArray.push(book);
        }
    }
    return false;
    // return booksArray;
};


module.exports.update = (id, body) => {
    for (const book of books) {
        if (book.id == id) {
            if (body.name && body.authorId) {
                // const author = .find(author => author.id == body.authorId);
                const authors = authorService.findAll();
                for (const author of authors) {

                    if (author.id == body.authorId) {
                        book.name = body.name;
                        book.authorId = body.authorId;
                        return book;
                    }

                }
                throw new ErrorNotFound(`do not found an author whit that id: ${body.authorId}`);
            }
            if (body.name) {
                book.name = body.name;
                return book;
            }
            if (body.authorId) {
                const authors = authorService.findAll();
                for (const author of authors) {

                    if (author.id == body.authorId) {
                        book.authorId = body.authorId;
                        return book;
                    }

                }
                throw new ErrorNotFound(`do not found an author whit that id: ${body.authorId}`);
            }

        }
    }
    throw new ErrorNotFound(`do not found an book whit that id: ${id}`);
};

module.exports.deleteOne = (id) => {
    const deletedBook = _.remove(books, book => {
        return book.id == id;
    });
    if (deletedBook.length > 0) {
        return true;
    }
    if (deletedBook.length == 0) {
        throw new ErrorNotFound(`do not found a book whit that id: ${id}`);
    }

};