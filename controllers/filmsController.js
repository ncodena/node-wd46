let films = [
    {
        id: 1,
        name: "The Godfather",
        releaseYear: 1972
    },
    {
        id: 2,
        name: "The Apartment",
        releaseYear: 1960
    },
    {
        id: 3,
        name: "The Artist",
        releaseYear: 2011
    }
];

export const getFilms = (req, res) => {
    res.json(films)
}

export const getFilm = (req, res) => {
    res.send('GET fetch film')

    const {id} = req.params;
    console.log(id)
}