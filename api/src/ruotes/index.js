const { Router, response, request } = require("express");
const router = Router();

const {
    getQuote,
    getCharacters,
    addCharacters,
    getCharacterById,
    getEpisodes,
    getEpisodeById } = require('../controllers');

// Aqui crearemos nuestras rutas

router.get('/quote', getQuote)

router.get('/characters', getCharacters)

router.post('/characters', addCharacters)

router.get('/characters/:id', getCharacterById)

router.get('/episodes', getEpisodes)

router.get('/episodes/:id', getEpisodeById)

module.exports = router;
