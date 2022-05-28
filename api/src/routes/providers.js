const { Router } = require ('express');
const { Provider, Pet } = require('../db')
const {Op} = require('sequelize')

const router = Router()

router.get('/', async(req, res, next) =>{

    const {name, filter, order} = req.query

    let allProviders;

    try{

        if(name){
            allProviders = await Provider.findAll({
                where: {
                    name:{
                        [Op.iLike]: '%' + name + '%'
                    }
                },
                order:[["name", 'ASC']]
            })

        }else if(filter){
            allProviders = await Provider.findAll({
                where: {
                    service: filter
                },
                order:[["price", order]]
            })

        }else{
            allProviders = await Provider.findAll({
            order:[["name", order]]
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

    let auxName = name.toLowerCase()
    let auxLastName = lastName.toLowerCase()

    try{
        await Provider.findOrCreate({
            where: {email: email},
            defaults:{
                name: auxName,
                lastName: auxLastName,
                email,
                profilePicture,
                address,
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
            }
        })

        res.status(201).send('Usuario creado con éxito')

    }catch(err){
        next(err)
    }
})


router.put('/:id', async (req, res, next) =>{
    const id = req.params.id
    const provider = req.body

    try{
        await Provider.update(provider,{
            where:{
                id: id
            }
        })
    
        return res.json('Usuario modificado')

    }catch(err){
        next(err)
    }

})


router.delete('/:id', async (req, res, next) =>{
    const id = req.params.id

    try{
        await Provider.update({isActive: false},{
            where:{
                id: id
            }
        })
    
        return res.json('Usuario desvinculado')

    }catch(err){
        next(err)
    }

})


module.exports = router;