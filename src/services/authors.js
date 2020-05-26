const authors = require('../authors.json');
const bookServices = require('../services/books');
const { ErrorNotFound, ErrorBadRequest, ErrorUsed } = require('../error/error');
const _ = require('lodash');

module.exports.create = (body) => {
    const id = `${authors.length + 1}`;
    authors.push({
        "id": id,
        "name": body.name,
        "lastname": body.lastname
    });
};

module.exports.findAll = () => {
    return authors;
};

module.exports.update = (id, body) => {
    for (const author of authors) {
        if (author.id == id) {
            if (body.name && body.lastname) {
                author.name = body.name;
                author.lastname = body.lastname;
                return author;
            }
            if (body.name) {
                author.name = body.name;
                return author;
            }
            if (body.lastname) {
                author.lastname = body.lastname;
                return author;
            }
        }
    }
    throw new ErrorNotFound(`do not found an author whit that id: ${id}`);
};

module.exports.deleteOne = (id) => {
    // authors.forEach((author, i) => {
    for (const author of authors) {
        if (author.id == id) {
            const encontrados = bookServices.getbooksByAuthor(id);
            if (encontrados) {

                throw new ErrorUsed('you can not delete an author with books');
            }
            if (!encontrados) {
                console.log("5");
                _.remove(authors, a => {
                    return a.id == id;
                });
                return authors;
            }


        }
    }
    throw new ErrorNotFound(`do not found an author whit that id: ${id}`);
};