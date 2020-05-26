const { Router } = require('express');
const router = Router();
const _ = require('lodash');
const authorService = require('../services/authors');
const { ErrorNotFound, ErrorUsed } = require('../error/error');


//get all authors
router.get('/', (req, res) => {
    const authorsForService = authorService.findAll();
    res.status(200).json(authorsForService);
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    new Promise((resolve) => {
        const data = authorService.deleteOne(id);
        if (data) {
            resolve(data);
        }

    }).then(resolve => {
        res.status(201).json({
            message: "the author has been successfully deleted",
            data: resolve
        });
    }).catch((error) => {

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
    new Promise((resolve) => {
        const author = authorService.update(id, req.body);
        if (author) {

            resolve(author);
        }
    }).then(resolve => {
        res.status(200).json({ message: 'the author has been successfully updated', data: resolve });
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




router.post('/', (req, res) => {
    const { name, lastname } = req.body;
    if (name && lastname) {
        authorService.create(req.body);
        res.status(201).json({ 'msj': 'created author', data: authorService.findAll() });
    } else {
        res.status(400).json({ error: "you need provided a name author whit a lastname" });
    }
});



module.exports = router;



// Forma Anterior
// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     _.remove(authors, (author, i) => {
//         if (author.id == id) {
//             _.each(books, (book) => {
//                 if (book.authorId === id) {
//                     res.json({ "msj": "can not delete an author if they have books in library" });
//                 }
//             });
//             authors.splice(i, 1);
//             res.json(authors);
//         }
//     });
//     res.json({ "msj": "an author do you want to delete, does not exist" });
// });


// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const { name, lastname } = req.body;

//     _.each(authors, (author) => {
//         if (author.id == id) {
//             if (name && lastname) {
//                 author.name = name;
//                 author.lastname = lastname;
//                 res.status(200).json(author);
//             } else {
//                 res.status(400).json({ 'msj': 'you need provided a name author whit a lastname' });
//             }
//             if (name) {
//                 author.name = name;
//                 res.status(200).json(author);
//             } else {
//                 res.status(400).json({ 'msj': 'you need provided a name author whit a lastname' });
//             }
//             if (lastname) {
//                 author.lastname = lastname;
//                 res.status(200).json(author);
//             } else {
//                 res.status(400).json({ 'msj': 'you need provided a name author whit a lastname' });
//             }
//         }
//     });
//     res.status(400).json({ "msj": "author do not exist" });

// });