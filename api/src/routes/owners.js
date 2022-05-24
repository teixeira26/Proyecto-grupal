const { Router } = require ('express');
const { Owner, Pet } = require('../db')

const router = Router()

router.get('/', async(req, res, next) =>{

    try{

        let allOwners = await Owner.findAll({
            include: Pet,
            order: [['name', 'ASC']]
        })

        allOwners.length ?
        res.status(200).send(allOwners) :
        res.status(400).send('No hay usuarios cargados')

    }catch(err){
        next(err)
    }
})


router.post('/', async(req, res, next) =>{

    const {name, lastName, email, profilePicture, address} = req.body

    let auxName = name[0].toUpperCase() + name.slice(1).toLowerCase()
    let auxLastName = lastName[0].toUpperCase() + lastName.slice(1).toLowerCase()

    try{
        await Owner.create({
                name: auxName,
                lastName: auxLastName,
                email,
                profilePicture,
                address,
            })

        res.status(201).send('Usuario creado con éxito')

    }catch(err){
        next(err)
    }

})

module.exports = router;