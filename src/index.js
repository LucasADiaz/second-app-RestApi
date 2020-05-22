const express = require('express');
const app = express();
const morgan = require('morgan');

//settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//routes
app.use(require('../routes/index'));
app.use('/api/movies', require('../routes/movies'));
app.use('/api/users', require('../routes/users'));
//importamos la ruta de los libros
app.use('/api/books', require('../routes/books'));
app.use('/api/authors', require('../routes/author'));

//starting server
app.listen(3000, () => {
    console.log(`server en port ${app.get('port')}`);
});