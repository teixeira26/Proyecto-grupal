const { Router } = require("express");
const { Product } = require("../db");
const { Op } = require("sequelize");
const {
  ACCESS_TOKEN
} = process.env;

const { mercadopago } = require("../utils/mercadoPago");

const router = Router();

const payProduct = async (req, res) => {
  // const id = req.params.id
  const cart = req.body.cart;
  const user = req.body.user;
  const date = req.body.response;
  console.log("USUARIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO", user);

  console.log("CARRITOOOOOOOOOOOOOO", cart);
  // const product = await Product.findByPk(id)
  let items = [];

  cart.forEach((i) =>
    items.push({
      title: i.name,
      description: i.description,
      picture_url: i.profilePicture,
      id: i.id,
      quantity: i.quantity,
      unit_price: i.price,
      currency_id: "ARS",
    })
  );

  let payer = {
    name: user.given_name,
    surname: user.family_name,
    // client_id
    // id: body.client_id
    //   email: user.email
  };
  // console.log("PAYEEEEEEEEEEEERR",payer)

  let preference = {
    payer_email: "test_user_41002316@testuser.com",
    items: items,
    payer: payer,
    back_urls: {
      failure: "/failure",
      pending: "/pending",
      success: "http://localhost:3000/confirmacion",
    },
    notification_url: "https://2bd1-181-168-161-231.sa.ngrok.io/products/notificacion",
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
router.post("/checkout", payProduct);

const orderNotification = async (req, res) => {
  try {
    console.log(req.body)
    res.status(200).send("OK");
  } catch (error) {
    console.log("ERROR", error)
  }
};

router.post("/notificacion", orderNotification);

router.get("/confirmation", async(req,res,next) => {
  const id = req.body.data.id
  try {
    if(id){
      let res = await axios.get(`https://api.mercadopago.com/v1/payments/${id}?access_token=${ACCESS_TOKEN}`)
      console.log("RESPUESTA COMPRAAAAAAAAAAA", res);
      res.send("informacion zarpada loco")
    }
    console.log("NO ENTRO")
    res.send("volver a empezar que no termina el juego")
  } catch (err) {
    console.log("ERR", err)
  }
})

router.get("/", async (req, res, next) => {
  const { name } = req.query;
  let allProducts;
  try {
    if (name) {
      allProducts = await Product.findAll({
        where: {
          name: {
            [Op.iLike]: "%" + name + "%",
          },
        },
      });
    } else {
      allProducts = await Product.findAll({});
    }
    allProducts
      ? res.status(200).send(allProducts)
      : res.status(400).send("No hay productos cargados");
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  let productById;
  try {
    productById = await Product.findByPk(id);
    res.send(productById);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  let productById;
  try {
    productById = await Product.findByPk(id);
    res.send(productById);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const {
    name,
    category,
    weight,
    price,
    stock,
    photos,
    profilePicture,
    targetAnimal,
    tradeMark,
    description,
  } = req.body;
  try {
    await Product.findOrCreate({
      where: {
        name,
        category,
        weight,
        price,
        stock,
        photos,
        profilePicture,
        description,
        targetAnimal,
        tradeMark,
        description,
      },
    });
    res.status(201).send("Producto agregado con éxito");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const product = req.body;
  try {
    await Product.update(product, {
      where: {
        id: id,
      },
    });
    return res.json("Producto modificado");
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    await Product.update(
      {
        isActive: false,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json("Producto eliminado");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
