const { Router } = require ('express');
const { Review, Owner, Provider} = require('../db');

router = Router();

router.get('/', async (req, res) => {
    try {
        const reviews = await Review.findAll({
            include: [Owner, Provider]
        })
        res.status(201).json(reviews);
    } catch (error) {
        res.status(404).send('encontramos nada');
    }
})

router.post('/', async (req, res) => {
    const { ownerEmail, providerEmail, OwnerName, review, message } = req.body
    try {
        const reviews = await Review.findOrCreate({
            where: {
                ownerEmail,
                providerEmail
            },
            defaults: {
                ownerEmail,
                providerEmail,
                name: OwnerName,
                review,
                message,
            }
        })
        res.status(201).json(reviews);
    } catch (error) {
        res.status(404).send('encontramos nada');
    }
})

router.put('/', async (req, res, next) =>{
    const newReview = req.body;
    try{
        await Review.update(newReview,{
            where:{
                id: newReview.id
            }
        }) 
        return res.json('Usuario modificado');
    }catch(err){
        next(err)
    }
});

module.exports = router;