import 'dotenv/config'
import express from 'express';
import filmsRouter from './routes/films.js';

const app = express();
const port = 8000;

console.log(process.env.POTATOE_HOST)



app.use('/films', filmsRouter)


app.get('/', (req, res) => {
    res.send('GET request to the root')
})


app.listen(port, () => {
  console.log(`Films app listening on port ${port}`)
})