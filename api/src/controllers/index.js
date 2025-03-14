const axios = require('axios');
const { v4: uuidv4 } = require('uuid'); //libreria para crear ids
const URL = 'https://www.breakingbadapi.com/api/';

let todosLosPj = [
  { id: 1, nombre: 'Sebas', imagen: 'algo', cumple: '23/04' },
  { id: 2, nombre: 'Luna', imagen: 'algo', cumple: '23/04' },
  { id: 3, nombre: 'Reynaldo Mora', imagen: 'algo', cumple: '23/04' },
];
const getCharacters = async (req, res) => {
  const { name } = req.query;
  if (name) {
    const { data } = await axios.get(`${URL}characters?name=${name}`);
    const found = data.map((c) => {
      return {
        id: c.char_id,
        nombre: c.name,
        imagen: c.img,
        cumple: c.birthday,
      };
    });
    return res.json(found);
  }

  try {
    const { data } = await axios.get(`${URL}characters`);
    const allCharacters = data.map((c) => {
      return {
        id: c.char_id,
        nombre: c.name,
        imagen: c.img,
        cumple: c.birthday,
      };
    });
    return res.json(allCharacters);
  } catch (error) {
    console.log(error);
  }
};

const getQuotes = async (req, res) => {
  const { data } = await axios.get(`${URL}quotes`);
  res.json(data);
};
const addCharacter = async (req, res) => {
  const { nombre, img, cumple } = req.body;
  const pj = {
    id: uuidv4(),
    nombre,
    img,
    cumple,
  };
  res.json(pj);
};

const getCharacterById = async (req, res) => {
  const { id } = req.params;
  const { data } = await axios.get(`${URL}characters/${id}`);
  res.json(data);
};

const getEpisodes = async (req, res) => {
  const { data } = await axios.get(`${URL}episodes`);
  res.json(data);
};

const getEpisodesById = () => {};

const changeCharacter = async (req, res) => {
  const { id } = req.params;
  const { nombre, cumple, img } = req.body;
  //buscar al pj q queremos editar x id
  let pj = todosLosPj.find((p) => p.id === id);
  pj = {
    id,
    nombre,
    cumple,
    img,
  };
  res.json(pj);
};
const deleteCharacter = async (req, res) => {
  const { id } = req.params;
  todosLosPj = todosLosPj.filter((p) => p.id !== id);
  res.json('Pj borrado');
};
module.exports = {
  getQuotes,
  getCharacters,
  addCharacter,
  getCharacterById,
  getEpisodes,
  getEpisodesById,
  changeCharacter,
  deleteCharacter,
};
