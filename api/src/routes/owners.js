const { Router } = require ('express');
const { Owner, Pet, Product, Sold } = require('../db');

const router = Router();

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
router.get('/getFavorites/:email', async(req, res, next) =>{
    const email = req.params.email
    try{

        let owner = await Owner.findOne({
            where:{
                email,
            }
        })

        owner&&owner.favorites&&owner.favorites.length ?
        res.status(200).send(owner.favorites) :
        res.status(400).send('No hay usuarios cargados')

    }catch(err){
        next(err)
    }
})

router.post('/', async(req, res, next) =>{

    const {name, lastName, email, profilePicture, address} = req.body

    let auxName = name.toLowerCase()
    let auxLastName = lastName.toLowerCase()

    try{
        await Owner.findOrCreate({
                where: {email: email},
                defaults:{
                    name: auxName,
                    lastName: auxLastName,
                    email,
                    profilePicture,
                    address,
                }})

        res.status(201).send('Usuario creado con éxito')

    }catch(err){
        next(err)
    }
})

router.put('/addFavorite', async (req, res, next) =>{
    const newOwner = req.body
    console.log("iajdisjd",req.body)
    try{
        await Owner.update(newOwner,{
            where:{
                email:newOwner.email
            }
        })
        
    
        return res.json('Usuario modificaado')

    }catch(err){
        next(err)
    }

})
router.put('/:email', async (req, res, next) =>{
    const id = req.params.email
    const owner = req.body

    try{
        await Owner.update(owner,{
            where:{
                email: id
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
        await Owner.update({isActive: false},{
            where:{
                id: id
            }
        })
    
        return res.json('Usuario desvinculado')

    }catch(err){
        next(err)
    }
})


router.post('/checkout', async(req, res, next) =>{

    const {email, id, quantity} = req.body

    try{

        // let 
        await Sold.create({
            quantity,
            ownerEmail: email,
            productId: id,
        })

        // let foundOwner = await Owner.findOne({
        //     where:{
        //         email: email
        //     }
        // })

        // let foundProduct = await Product.findOne({
        //     where:{
        //         id: id
        //     }
        // })

        // await foundProduct.addSold(newSold)

        res.status(201).send('Producto vendido con éxito')

    }catch(err){
        next(err)
    }
})

module.exports = router;