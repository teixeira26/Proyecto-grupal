const { Router } = require('express');
const { Event, Owner, Provider } = require('../db');

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        let allEvents = await Event.findAll({
            includes: [Owner, Provider]
        })
        allEvents.length ?
            res.status(200).send(allEvents) :
            res.status(400).send('Actualmente no existen reservas en el sitio');
    } catch (error) {
        next(error)
    }
});

router.post('/', async (req, res, next) => {
    const { date, eventType, comments, payment, ownerEmail, providerEmail, petName } = req.body;
    try {
        
        let providerInfo = await Provider.findOne({
            where: {email: providerEmail}
        })
        console.log(providerInfo)
        if (providerInfo.dataValues.schedule[date.day].includes(date.hour)) {
            let booking = await Event.findOrCreate({
                where: {
                    ownerEmail,
                    providerEmail,
                    date,
                    eventType
                },
                defaults: {
                    date,
                    eventType,
                    comments,
                    payment,
                    ownerEmail,
                    providerEmail
                }
            })
            res.status(201).send('La reserva ha sido creada con exito');
        } else {
            res.status(400).send('Ya existen reservas en este horario. Por favor, elige otra opcion')
        }
    } catch (error) {
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

// ruta para cargar horario de trabajo
router.put('/schedule', async (req, res, next) => {
    const {
        providerEmail,
        schedule
    } = req.body;

    try {
        let userData = await Provider.findOne({
            where: {
                email: providerEmail
            }
        })
        userData = {
            ...userData,
            schedule
        }
        await Provider.update(userData, {
            where: {
                email: providerEmail
            }
        })
        return res.json('Horario de trabajo actualizados')
    } catch (error) {
        next(error)
    }
});

module.exports = router;