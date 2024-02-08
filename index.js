import 'dotenv/config'
import express from 'express';
import filmsRouter from './routes/films.js';
import { connectDatabase } from './db/client.js';

const app = express();
const port = 8000;

app.use(express.json());
app.use('/films', filmsRouter)

const startServer = async () => {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`Films app listening on port ${port}`)
  })
}

startServer().catch(error => {
  console.log(error, 'failed to start server')
})

