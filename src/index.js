import express from 'express';
import cors from 'cors';
import userRouter from './routes/user-router.js';
import entryRouter from './routes/entry-router.js';
import authRouter from './routes/auth-router.js';
import { errorHandler, notFoundHandler } from './middlewares/error-handler.js';
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

// Käyttäjän autentikoiminen (kirjautuminen)
app.use('/api/auth', authRouter);

// Users-resurssin päätepisteet (endpoint)
app.use('/api/users', userRouter);

// Entries-resurssien päätepisteet (endpoint)
app.use('/api/entries', entryRouter);

// Kaikki olemattomat resurssit ohjataan middlewarelle
app.use(notFoundHandler);

// Virheet ohjataan virheenkäsittelijälle
app.use(errorHandler);

// Serveri kuuntelee porttia osoitteessa yhteydenottojen varalta
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
