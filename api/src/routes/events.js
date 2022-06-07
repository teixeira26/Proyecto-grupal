const { Router } = require('express');
const { Event, Pet } = require('../db');

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        let allEvents = await Event.findAll({
            includes: Pet
        })
        allEvents.length ?
            res.status(200).send(allEvents) :
            res.status(400).send('Actualmente no existen reservas en el sitio');
    } catch (error) {
        next(error)
    }
});

router.post('/', async (req, res, next) => {
    const { date, eventType } = req.body;
    try {
        await Event.findOrCreate({
            where: {
                email: email
            },
            defaults: {
                date,
                eventType
            }
        })
        res.status(201).send('La reserva ha sido creada con exito');
    } catch (errpr) {
        next(error)
    }
});

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await Event.update({
            isActive: false
        }, {
            where: {
                id: id
            }
        })
        return res.json('Reserva eliminada');
    } catch (error) {
        next(error)
    }
});

module.exports = router;