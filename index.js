import express from 'express';
import petsRouter from './routes/pets.js';
import { pets } from './petsList.js';


const app = express();
const port = 8001;

app.use('/animals', petsRouter)


app.get('/', (req, res) => {
    const petTypeLinks = Object.keys(pets).map(type => `<li><a href="/animals/${type}">${type}</a></li>`).join('');
    res.send(`
        <h1>Adopt a Pet!</h1>
        <p>Browse through the links below to find your new furry friend:</p>
        <ul>
            ${petTypeLinks}
        </ul>
    `);
});

//Static approach

// app.get('/', (req, res) => {
//     res.send(`
//       <h1>Adopt a Pet!</h1>
//       <p>Browse through the links below to find your new furry friend:</p>
//       <ul>
//         <li><a href="/pets/dogs">Dogs</a></li>
//         <li><a href="/pets/cats">Cats</a></li>
//         <li><a href="/pets/rabbits">Rabbits</a></li>
//       </ul>
//     `);
// });

app.listen(port, () => {
  console.log(`Adopt a Pet app listening on port ${port}`)
})