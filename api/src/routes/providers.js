const { Router } = require ('express');
const { Provider, Pet } = require('../db')
const {Op} = require('sequelize')

const router = Router()

router.get('/', async(req, res, next) =>{

    const {name} = req.query

    let allProviders;

    try{

        if(name){
            allProviders = await allProviders.findAll({
                where: {
                    name:{
                        [Op.iLike]: '%' + name + '%' //   
                    }
                },
                order:[["name", 'ASC']]
            })

        }else{
            allProviders = await Provider.findAll({
            order:[["name", 'ASC']]
            })
        }

        allProviders.length ?
        res.status(200).send(allProviders) :
        res.status(400).send('No hay usuarios cargados')
       
    }catch(err){
        next(err)
    }
})



router.post('/', async(req, res, next) =>{

    const {name, lastName, email, profilePicture, address, service, description, price, typeOfHousing, housingPhotos, schedule, dogsPerWalk} = req.body

    let auxName = name[0].toUpperCase() + name.slice(1).toLowerCase()
    let auxLastName = lastName[0].toUpperCase() + lastName.slice(1).toLowerCase()

    try{
        await Provider.create({
                name: auxName,
                lastName: auxLastName,
                email,
                profilePicture,
                address,
                service,
                description,
                price,
                typeOfHousing,
                housingPhotos,
                housingPhotos,
                schedule,
                dogsPerWalk
            })

        res.status(201).send('Usuario creado con éxito')

    }catch(err){
        next(err)
    }
})

module.exports = router;