const { Router } = require('express');
const router = Router();
const _ = require('lodash');


//traigo los datos del sample.json
const books = require('../src/books.json');
const authors = require('../src/authors.json');


//get all authors
router.get('/', (req, res) => {
    res.status(200).json(authors);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    _.remove(authors, async(author, i) => {
        if (author.id == id) {
            await _.each(books, (book) => {
                if (book.authorId === id) {
                    res.json({ "msj": "can not delete an author if they have books in library" });
                }
            });
            authors.splice(i, 1);
            res.json(authors);
        }
    });
    res.json({ "msj": "an author do you want to delete, does not exist" });
});



router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, lastname } = req.body;


    if (name && lastname) {
        _.each(authors, (author) => {
            if (author.id == id) {
                author.name = name;
                author.lastname = lastname;
                res.status(200).json(author);
            }
        });
        res.status(404).json({ error: "author do not exist" });
    } else {
        res.status(400).json({ 'msj': 'you need provided a name author whit a lastname' });
    }
});


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



router.post('/', (req, res) => {
    const { name, lastname } = req.body;
    if (name && lastname) {
        const id = `${authors.length + 1}`;
        const newAut = { id, ...req.body };
        authors.push(newAut);
        // res.json(authors);
        res.status(201).json({ 'msj': 'created author' })
    } else {
        res.status(400).json({ error: "you need provided a name author whit a lastname" });
    }
});



module.exports = router;