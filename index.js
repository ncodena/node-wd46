import 'dotenv/config'
import express from 'express';
import filmsRouter from './routes/films.js';
import { connectDatabase } from './db/client.js';
import usersRouter from './routes/users.js';
import countriesRouter from './routes/countries.js';

const app = express();
const port = 8000;

app.use(express.json());
app.use('/films', filmsRouter);
app.use('/users', usersRouter);
app.use('/countries', countriesRouter)

const startServer = async () => {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`Films app listening on port ${port}`)
  })
}

startServer().catch(error => {
  console.log(error, 'failed to start server')
})

