const { Router } = require("express");
const { Sold, Owner } = require("../db");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    let allSolds = await Sold.findAll({});

    allSolds.length
      ? res.status(200).send(allSolds)
      : res.status(400).send("No hay ventas");
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const {
    id,
    first_name,
    last_name,
    items,
    status,
    date_created,
    transaction_amount,
    email,
  } = req.body;
  try {
    let newSold = await Sold.create({
      id,
      first_name,
      last_name,
      items,
      status,
      date_created,
      transaction_amount,
    });

    console.log("SOY UN NEWSOLD",newSold)

    let found = await Owner.findOne({
      where: {
        email: email,
      },
    });
    console.log("nombre", found)
    console.log("nombre", email)

    await found.addSold(newSold);

    res.status(201).send("Venta cargada con éxito");
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;

  let soldById

  try {
    soldById = await Sold.findByPk(id)
      res.send(soldById)

  } catch (error) {
      next(error)
  }

})

module.exports = router;
