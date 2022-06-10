const { Router } = require("express");
const { Sold } = require("../db");
const router = Router();



router.get('/', async(req, res, next) =>{

    try{

        let allSolds = await Sold.findAll({
        })

        allSolds.length ?
        res.status(200).send(allSolds) :
        res.status(400).send('No hay ventas')

    }catch(err){
        next(err)
    }
});


router.post("/", async(req,res,next) => {
    const {id, first_name, last_name, items, status, date_created, transaction_amount,email }= req.body;
    try{
        let newSold = await Sold.create({

            id,
            first_name,
            last_name,
            items,
            status,
            date_created,
            transaction_amount,

                })

        let found = await Owner.findOne({
            where: {
                email: email
            }
        })

        await newSold.addOwner(found)


        res.status(201).send('Venta cargada con éxito')

    }catch(err){
        next(err)
    }
})


module.exports = router