const { Router } = require('express');
const router = Router();
const routesBooks = require('./books');
const routesAuthor = require('./author');


//importamos la ruta de los libros
router.use('/api/books', routesBooks);
router.use('/api/authors', routesAuthor);



module.exports = router;