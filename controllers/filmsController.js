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
    const searchTerm = req.query.search;
 
    // If no search term provided, retrieve all films
    if (!searchTerm) {
      return res.send(films);
    }
 
    // Otherwise, find the recipe
    // Find films that match the search term (case insensitive and partial match)
    const matchedFilms = films.filter(film => 
        film.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // If the filter gets no results, 404 Not Found status is returned to the client with a message indicating that no records match the criteria.
    if (matchedFilms.length === 0) {
      return res.status(404).send('Films not found');
    }
 
    res.json(matchedFilms);
}

export const getFilm = (req, res) => {
    const {id} = req.params;

    //ID is parsed from a string to an integer to ensure that it can be compared to the id property of each recipe, which is type number. 
    const film = films.find(film => film.id === parseInt(id));

    //If no film is found, 404 Not Found status is returned to the client with a message indicating that the resource was not found.
    if (!film) {
      return res.status(404).send('Film not found')
    }
   
    res.send(film)
}