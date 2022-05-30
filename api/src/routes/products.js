const { Router } = require ('express');
const { Product } = require('../db')
const { Op } = require('sequelize');

const router = Router()

router.get('/', async (req, res, next) =>{
    const{name} = req.query

    let allProducts;

    try{
        if(name){
            allProducts = await Product.findAll({
                where:{
                    name:{
                        [Op.iLike]: '%' + name + '%'
                    }
                }
            })
        }else{
            allProducts = await Product.findAll({

            })
        }
        allProducts?
        res.status(200).send(allProducts) :
        res.status(400).send('No hay productos cargados')


    }catch(err){
        next(err)
    }
    

})








router.post('/', async(req, res, next) =>{

    const {name, category, weight, price, stock, photos, profilePicture, targetAnimal, tradeMark } = req.body

    try{
        await Product.findOrCreate({
                where:{
                    name,
                    category,
                    weight,
                    price,
                    stock,
                    photos,
                    profilePicture,
                    targetAnimal,
                    tradeMark
                }})

        res.status(201).send('Producto agregado con éxito')

    }catch(err){
        console.log(err)
        next(err)
    }
})


router.put('/:id', async (req, res, next) =>{
    const id = req.params.id
    const product = req.body

    try{
        await Product.update(product,{
            where:{
                id: id
            }
        })
    
        return res.json('Producto modificado')

    }catch(err){
        next(err)
    }

})


router.delete('/:id', async (req, res, next) =>{
    const id = req.params.id

    try{
        await Product.update({isActive: false},{
            where:{
                id: id
            }
        })
    
        return res.json('Producto eliminado')

    }catch(err){
        next(err)
    }

})




module.exports = router;