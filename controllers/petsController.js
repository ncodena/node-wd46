import { pets } from "../petsList.js";

export const getPetsType = (req, res) => {
    const petType = req.params.pet_type;

    if (!pets[petType]) {
        return res.status(404).send("Pet type not found");
    }

    const petItems =  pets[petType].map((pet) => {
        const petUrl = `/animals/${petType}/${pet.name}`;
        return `<li><a href="${petUrl}">${pet.name}</a></li>`;
    });


    const content = `
        <button onclick="window.history.back();">Go Back</button>
        <h1>List of ${petType}</h1>
        <ul>
            ${petItems.join('')}
        </ul>
    `;
    res.send(content);
}

export const getPetsName = (req, res) => {
    const { pet_type, pet_id } = req.params;

    const findPet = pets[pet_type].find(pet => pet.name.toLowerCase() === pet_id.toLowerCase());

    if (!findPet) {
        return res.status(404).send("Pet not found");
    }
    const content = `
        <button onclick="window.history.back();">Go Back</button>
        <h1>${findPet.name}</h1>
        <img src="${findPet.url}" alt="${findPet.name}" />
        <p>${findPet.description}</p>
        <ul>
            <li>Breed: ${findPet.breed}</li>
            <li>Age: ${findPet.age}</li>
        </ul>
    `;
    res.send(content);
    
}