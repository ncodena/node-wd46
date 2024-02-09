import Country from "../models/Country.js";

export const getCountries = async (req, res) => {
    try {

        const { sort, visited } = req.query;
        let queryOptions = {};
        let sortOptions = {};

        if (visited) {

            if (visited === 'true') {
                queryOptions.visited = 'true';
            } else {
                queryOptions.visited = 'false';
            }
            
        }

        if(sort){
            if (sort === 'true') {
                sortOptions.name = 1; //Ascending
            } else {
                sortOptions.name = -1; //Descending

            }
        }
        
        const data = await Country.find(queryOptions).sort(sortOptions);
        res.json(data);
      } catch (err) {
        res.status(500).json({ message: err.message });
    }
    
}

export const getCountry = async (req, res) => {
    res.json(req.country)

}

export const postCountry = async (req, res) => {
    const { name, alpha2Code, alpha3Code } = req.body;
    try {
      const data = await Country.create({ name, alpha2Code, alpha3Code });
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

export const modifyCountry = async (req, res) => {
    const { code } = req.params;
    const country = await Country.findOneAndUpdate({ $or: [{ alpha2Code: code.toUpperCase() }, { alpha3Code: code.toUpperCase() }] }, req.body, { new: true });
    res.json(country);
}

export const deleteCountry = async (req, res) => {
    const { code } = req.params;
    try {
        // const data = await Country.findOneAndDelete({ $or: [{ alpha2Code: code.toUpperCase() }, { alpha3Code: code.toUpperCase() }] });
        // res.status(204).json(data);

        // //Delete endpoint would just change that specific flag in your country object docuent of completely removing it from the collection.
        const country = await Country.findOne({ $or: [{ alpha2Code: code.toUpperCase() }, { alpha3Code: code.toUpperCase() }] });
        
        //const country = {name: "anyname"}
        // Toggle the visited status. Change to opposite boolean state
        country.visited = !country.visited;
        await country.save();
        res.json({ message: `Country ${country.visited ? 'marked as visited' : 'marked as to visit'}.`, country: country });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 }

