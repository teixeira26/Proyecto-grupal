const { Router } = require('express');
const { Owner, Pet } = require('../db');

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        let allPets = await Pet.findAll({
            order: [
                ['name', 'ASC']
            ]
        })

        allPets.length ?
            res.status(200).send(allPets) :
            res.status(400).send('No hay mascotas cargados')

    } catch (err) {
        next(err)
    }
});

router.post('/', async (req, res, next) => {
    const {
        name,
        type,
        race,
        size,
        photos,
        description,
        ownerEmail
    } = req.body;
    let auxName = name.toLowerCase();

    try {
        let newPet = await Pet.create({
            name: auxName,
            type,
            race,
            size,
            profilePicture: photos,
            description
        })

        console.log(newPet)

        let found = await Owner.findOne({
            where: {
                email: ownerEmail
            }
        })

        console.log('nombre', found)
        console.log('nombre', ownerEmail)
        
        await found.addPet(newPet)
        // await newPet.addOwner(1)
        res.status(201).send('Usuario creado con éxito')

    } catch (err) {
        next(err)
    }
});

router.put('/:id', async (req, res, next) => {
    const id = req.params.id
    const pet = req.body

    try {
        await Pet.update(pet, {
            where: {
                id: id
            }
        })

        return res.json('Mascota modificada')

    } catch (err) {
        next(err)
    }
});

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id

    try {
        await Pet.update({
            isActive: false
        }, {
            where: {
                id: id
            }
        })

        return res.json('Mascota desvinculado')

    } catch (err) {
        next(err)
    }
});

module.exports = router;