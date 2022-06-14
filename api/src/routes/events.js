const { Router } = require("express");
const { Event, Owner, Provider } = require("../db");
const router = Router();
const { ACCESS_TOKEN } = process.env;

const { mercadopago } = require("../utils/mercadoPago");

const payService = async (req, res) => {
  // const id = req.params.id
  const {id, eventType, price} = req.body;
  const user = req.body.user;
  //   const date = req.body.response;

  // console.log("USUARIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO", user);
  // console.log("SERVICIOOOOOOOOOOOOOOOOOOO", service);
  // const product = await Product.findByPk(id)
  //   let items = [];

  //   cart.forEach((i) =>
  //     items.push({
  //       service: i.name,
  //       id: i.id,
  //       quantity: i.quantity,
  //       unit_price: i.price,
  //       currency_id: "ARS",
  //     })
  //   );

  let payer = {
    name: user.given_name,
    surname: user.family_name,
    // client_id
    // id: body.client_id
    email: user.email
  };
  // console.log("PAYEEEEEEEEEEEERR",payer)

  let preference = {
    payer_email: "test_user_41002316@testuser.com",
    items: [{
      title: eventType,
      id: id,
      quantity: 1,
      unit_price: price,
      currency_id: "ARS",
    }],
    payer: payer,
    back_urls: {
      failure: "/failure",
      pending: "/pending",
      success: "http://localhost:3000/confirmacion",
    },
    notification_url:
      "https://1bbb-181-168-161-231.sa.ngrok.io/products/notificacion",
    auto_return: "approved",
  };
  mercadopago.preferences
    .create(preference)
    .then((response) => {
      console.log("RESPONSEEEEEEEEEEEEEEEE", response);
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "POST");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      res.set("Access-Control-Max-Age", "3600");
      res.set("Access-Control-Allow-Credentials", true);
      console.log("URL: ", response.body.init_point);
      res.json({
        global: response.body.id,
        // response
      });
    })
    .catch((err) => console.log(err));
};
router.post("/checkout", payService);

router.get("/", async (req, res, next) => {
  try {
    let allEvents = await Event.findAll({
      includes: [Owner, Provider],
    });
    allEvents.length
      ? res.status(200).send(allEvents)
      : res.status(400).send("Actualmente no existen reservas en el sitio");
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const {
    date,
    eventType,
    comments,
    payment,
    ownerEmail,
    providerEmail,
    petName,
    ownerName,
    providerName,
    price
  } = req.body;

  try {
    // busco al provider al que voy a hacer una reserva
    let providerInfo = await Provider.findOne({
      where: {
        email: providerEmail,
      },
    });

    let typeOfService = providerInfo.dataValues.service[0];
    console.log(typeOfService);
    // reviso si incluye el horario que necesito en el dia que quiero el servicio
    if (typeOfService === "paseo") {
      if (providerInfo.dataValues.schedule[date.day].includes(date.hour)) {
        // guardo el evento asociado con el provider
        let event = await Event.findAll({
          where: {
            providerEmail,
          },
        });
        let allEvents = event.map((x) => x.dataValues);

        // filtro todos los eventos que coincidan con el provider, dia y fecha en cuestion
        allEvents = allEvents.filter(
          (x) =>
            x.providerEmail === providerEmail &&
            x.date.day === date.day &&
            x.date.hour === date.hour
        );
        let totalAllEvents = allEvents.length;
        await Event.findOrCreate({
          where: {
            ownerEmail,
            providerEmail,
            date,
            eventType,
          },
          defaults: {
            date,
            eventType,
            comments,
            payment,
            ownerEmail,
            providerEmail,
            petName,
            ownerName,
            providerName,
            price
          },
        });
        // actualizo la cantidad de allEvents
        totalAllEvents += 1;

        // si la cantidad de eventos es igual a la cantidad de mascotas que puede pasear,
        // descartamos la opcion para reservar en ese horario filtrando el schedule del provider
        if (totalAllEvents >= providerInfo.dataValues.dogsPerWalk) {
          filteredSchedule = providerInfo.dataValues.schedule[date.day].filter(
            (x) => x !== date.hour
          );
          providerUpdated = {
            ...providerInfo,
            schedule: {
              ...providerInfo.dataValues.schedule,
              [date.day]: filteredSchedule,
            },
          };
          Provider.update(providerUpdated, {
            where: {
              email: providerEmail,
            },
          });
        }
        res.status(201).send("La reserva ha sido creada con exito");
      } else {
        res.status(400).send("Este horario no esta disponible.");
      }
    } else if (typeOfService === "hospedaje") {
      if (providerInfo.dataValues.schedule[date.day]) {
        let event = await Event.findAll({
          where: {
            providerEmail,
          },
        });
        let allEvents = event.map((x) => x.dataValues);

        // filtro todos los eventos que coincidan con el provider, dia y fecha en cuestion
        allEvents = allEvents.filter(
          (x) => x.providerEmail === providerEmail && x.date.day === date.day
        );
        console.log(`se ejecuto un evento post con el dia ${date.day}`);
        let totalAllEvents = allEvents.length;
        await Event.findOrCreate({
          where: {
            ownerEmail,
            providerEmail,
            date,
            eventType,
            petName,
          },
          defaults: {
            date,
            eventType,
            comments,
            payment,
            ownerEmail,
            providerEmail,
            petName,
            ownerName,
            providerName,
            price
          },
        });
        // actualizo la cantidad de allEvents
        totalAllEvents += 1;

        // si la cantidad de eventos es igual a la cantidad de mascotas que puede pasear,
        // descartamos la opcion para reservar en ese horario filtrando el schedule del provider
        if (totalAllEvents >= providerInfo.dataValues.dogsPerWalk) {
          providerUpdated = {
            ...providerInfo,
            schedule: {
              ...providerInfo.dataValues.schedule,
              [date.day]: false,
            },
          };
          Provider.update(providerUpdated, {
            where: {
              email: providerEmail,
            },
          });
        }
        res.status(201).send("La reserva ha sido creada con exito");
      } else {
        res.status(400).send("Este horario no esta disponible.");
      }
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Event.update(
      {
        isActive: false,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json("Reserva eliminada");
  } catch (error) {
    next(error);
  }
});

// ruta para cargar horario de trabajo
router.put("/schedule", async (req, res, next) => {
  const { providerEmail, schedule, price } = req.body;

  try {
    let userData = await Provider.findOne({
      where: {
        email: providerEmail,
      },
    });
    userData = {
      ...userData,
      schedule,
    };
    await Provider.update(userData, {
      where: {
        email: providerEmail,
      },
    });
    return res.json("Horario de trabajo actualizados");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
