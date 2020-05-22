const { Router } = require('express');
const router = Router();
const _ = require('underscore');
//traigo los datos del sample.json
const movies = require('../src/sample.json')


router.get('/', (req, res) => {
    res.json(movies);
});

router.post('/', (req, res) => {
    const { title, director, year, rating } = req.body;
    if (title && director && year && rating) {
        const id = movies.length + 1;
        const newMovie = { id, ...req.body };
        console.log(newMovie);
        movies.push(newMovie);
        res.json('recived');
    } else {
        res.status(500).json({ error: "there was error" });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    _.each(movies, (movie, i) => {
        if (movie.id === id) {
            movies.splice(i, 1);
        }
    });
    res.send(movies);

});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, director, year, rating } = req.body;
    if (title && director && year && rating) {
        _.each(movies, (movie, i) => {
            if (movie.id === id) {
                movie.title = title;
                movie.director = director;
                movie.rating = rating;
                movie.year = year;
            }
        });
        res.json(movies)
    } else {
        res.status(500).json({ error: "todos los campos se requieren" });
    }
    res.send(movies);

});





module.exports = router;