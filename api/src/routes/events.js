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
    const { date, eventType, comments, payment, ownerEmail, providerEmail, petName,day } = req.body;

    try {
        // busco al provider al que voy a hacer una reserva
        let providerInfo = await Provider.findOne({
            where: {
                email: providerEmail
            }
        });

        let typeOfService = providerInfo.dataValues.service[0]
        console.log(typeOfService)
        // reviso si incluye el horario que necesito en el dia que quiero el servicio
        if(typeOfService === 'paseo'){
         if (providerInfo.dataValues.schedule[date.day].includes(date.hour)) {
                
                // guardo el evento asociado con el provider
                let event = await Event.findAll({
                    where: {
                        providerEmail,
                    }
                });
                let allEvents = event.map(x => x.dataValues);

                // filtro todos los eventos que coincidan con el provider, dia y fecha en cuestion
                allEvents = allEvents.filter(x => x.providerEmail === providerEmail && x.date.day === date.day && x.date.hour === date.hour);
                let totalAllEvents = allEvents.length;
                await Event.findOrCreate({
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
                        providerEmail,
                        petName,
                        
                    }
                });
                // actualizo la cantidad de allEvents
                totalAllEvents += 1;

                // si la cantidad de eventos es igual a la cantidad de mascotas que puede pasear,
                // descartamos la opcion para reservar en ese horario filtrando el schedule del provider
                if (totalAllEvents >= providerInfo.dataValues.dogsPerWalk) {
                    filteredSchedule = providerInfo.dataValues.schedule[date.day].filter(x => x !== date.hour)
                    providerUpdated = {
                        ...providerInfo,
                        schedule: {...providerInfo.dataValues.schedule, [date.day]: filteredSchedule}
                    }
                    Provider.update(providerUpdated, {
                        where: {
                            email: providerEmail
                        }
                    })
                }
                res.status(201).send('La reserva ha sido creada con exito');
            } else {
                res.status(400).send('Este horario no esta disponible.');
            }}
        else if(typeOfService === "hospedaje"){
            if(providerInfo.dataValues.schedule[date.day]){

                let event = await Event.findAll({
                    where: {
                        providerEmail,
                    }
                });
                let allEvents = event.map(x => x.dataValues);
                
                // filtro todos los eventos que coincidan con el provider, dia y fecha en cuestion 
                allEvents = allEvents.filter(x => x.providerEmail === providerEmail && x.date.day === date.day);
                console.log(allEvents);
                let totalAllEvents = allEvents.length;
                await Event.findOrCreate({
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
                        providerEmail,
                        petName,
                        
                    }
                });
                // actualizo la cantidad de allEvents
                totalAllEvents += 1;

                // si la cantidad de eventos es igual a la cantidad de mascotas que puede pasear,
                // descartamos la opcion para reservar en ese horario filtrando el schedule del provider
                if (totalAllEvents >= providerInfo.dataValues.dogsPerWalk) {
                    providerUpdated = {
                        ...providerInfo,
                        schedule: {...providerInfo.dataValues.schedule, [date.day]:false}
                    }
                    Provider.update(providerUpdated, {
                        where: {
                            email: providerEmail
                        }
                    })
                }
                res.status(201).send('La reserva ha sido creada con exito');
            } else {
                res.status(400).send('Este horario no esta disponible.');
            }
        }
    } catch (error) {
        next(error)
    }
});

router.delete('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;
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