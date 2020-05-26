const express = require('express');
const app = express();
const morgan = require('morgan');
const routes = require('./routes/index')



//settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//routes
app.use(routes);


//starting server
app.listen(3000, () => {
    console.log(`server en port ${app.get('port')}`);
});