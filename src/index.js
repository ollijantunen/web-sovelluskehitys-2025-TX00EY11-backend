import express from 'express';
import cors from 'cors';
import {
  addItem,
  getItemById,
  getItems,
  removeItem,
  updateItem,
} from './items.js';
import {
  login,
} from './users.js';
import userRouter from './routes/user-router.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// Käytetään Cors-middlewarea
app.use(cors());

// Staattinen html-sivusto tarjoillaan palvelimen juuressa
app.use(express.static('public'));

// Middleware, joka lukee json-datan POST-pyyntöjen rungosta/hyötykuormasta(body)
app.use(express.json());

// REST-apin resurssit tarjoillaan muualla kuin juuressa, tässä /api/-polun alla
app.get('/api/', (req, res) => {
  console.log('get-pyyntö /api/-reittiin', req.url);

  res.send('Welcome to my REST API!');
});

// Users-resurssin päätepisteet (endpoint)
app.use('/api/users', userRouter)

// Items-resurssin päätepisteet (endpoint)
app.get('/api/items', getItems);
app.get('/api/items/:id', getItemById);
app.post('/api/items', addItem);
app.put('/api/items/:id', updateItem);
app.delete('/api/items/:id', removeItem);

// Users-resurssin päätepisteet (endpoint)
// app.get('/api/users', getUsers);
// app.get('/api/users/:id', getUserById);
// app.post('/api/users', addUser);
// app.put('/api/users/:id', updateUser);
// app.delete('/api/users/:id', removeUser);

// Mock login-reitti
app.post('/api/login', login);

// Syötteen lukeminen reittiparametreista (route parameter(=params))
app.get('/api/sum/:num1/:num2', (req, res) => {
  console.log('req.params', req.params);

  // testataan, että onko käyttäjän syötteistä jompikumpi ei-numero
  // esim. parseInt (etsii numeron 2def-> 2) / Number (desimaalit käy, koska js:ssä ei ole int)
  // virhetilakoodi ja viesti json-muodossa
  const num1 = parseInt(req.params.num1);
  const num2 = Number(req.params.num2);
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400);
    res.json({
      error: 'Molempien parametrien tulee olla numero',
    });
    return;
  }

  res.json({
    num1,
    num2,
    sum: num1 + num2,
  });
});

// Syötteen lukeminen kyselyparametreista (query parameter(=params))
app.get('/api/sum/', (req, res) => {
  console.log('req.query', req.query);
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);

  res.json({
    num1,
    num2,
    sum: num1 + num2,
  });
});

// POST-pyynnön käsittely ja datan lukeminen rungosta
app.post('/api/moro', (req, res) => {
  console.log(req.body);
  res.status(200);
  res.json({reply: 'No moro ' + req.body.sender});
  // res.send('Moro! Post version');
});

// TODO: lisää oma reitti ja toiminnallisuus

// GET-pyyntö tehtäviin, vastaus JSON-muodossa
app.get('/api/tehtavat', (req, res) => {
  console.log('GET tehtavat', req.url);

  const tehtavalista = [
    {id: '1', tehtava: 'Tehtäväkuvaus 1'},
    {id: '2', tehtava: 'Tehtäväkuvaus 2'},
    {id: '3', tehtava: 'Tehtäväkuvaus 3'},
  ];
  console.log(tehtavalista);

  res.json(tehtavalista);
});

// POST-pyyntö tehtäviin, vastaus JSON-muodossa
app.post('/api/tehtavat', (req, res) => {
  console.log(req.body);
  res.status(201);
  res.json({vastaus: 'Tehtäväkuvaus lisätty', runko: req.body});
});

// PUT-pyyntö tehtäviin, vastaus JSON-muodossa
app.put('/api/tehtavat/:id', (req, res) => {
  const id = Number(req.params.id);
  console.log(req.body);

  if (isNaN(id)) {
    res.status(400);
    res.json({
      error: 'Id:n tulee olla numero',
    });
    return;
  }

  if (JSON.stringify(req.body) === '{}') {
    res.status(400);
    res.json({error: 'Runko on tyhjä', runko: req.body});
    return;
  } else {
    res.status(200);
    res.json({vastaus: `Tehtävä ${id} päivitetty`, runko: req.body});
  }
});

// DELETE-pyyntö tehtävä Id:n perusteella, vastaus JSON-muodossa
app.delete('/api/tehtavat/:id', (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.set({'Content-Type': 'application/json'});
    console.log(res.get('Content-Type'));

    res.status(400);
    res.json({
      error: 'Id:n tulee olla numero',
    });
    return;
  }
  res.status(200);
  res.json({
    viesti: 'Poisto onnistui',
  });
});

// Kaikkien olemattomien resurssien vastaus 404
// Asteriski toimii, koska tämä kohta on viimeisenä reittinä tiedostossa
// Tosin http://127.0.0.1:3000 ilman kauttaviivaa menee funktioon, mutta staattinen juuren tiedosto tulee 200
app.all('*', (req, res) => {
  console.log('Olematon resurssi.');
  res.status(404);
  res.send('Reittiä ei löydy.');
});

// Serveri kuuntelee porttia osoitteessa yhteydenottojen varalta
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
