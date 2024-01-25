import express from 'express';
import filmsRouter from './routes/films.js';

const app = express();
const port = 8000;

app.use('/films', filmsRouter)

app.get('/', (req, res) => {
    res.send('GET request to the root')
})

app.post('/', (req, res) => {
    res.send('POST request to the root')
})

app.put('/', (req, res) => {
    res.send('PUT request to the root')
})

app.delete('/', (req, res) => {
    res.send('DELETE request to the root')
})


app.listen(port, () => {
  console.log(`Recipes app listening on port ${port}`)
})