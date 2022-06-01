const { Router } = require("express");
const ownersRoute = require("./owners.js");
const petsRoute = require("./pets.js");
const providersRoute = require("./providers.js");
const productsRoute = require("./products.js");
const PaymentController = require("../controllers/PaymentsController");
const PaymentService = require("../Services/PaymentsService");
const PaymentInstance = new PaymentController(new PaymentService());

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/owners", ownersRoute);
router.use("/pets", petsRoute);
router.use("/providers", providersRoute);
router.use("/products", productsRoute);

router.get("/payment", function (req, res, next) {
  PaymentInstance.getPaymentLink(req, res);
});

router.get("/subscription", function (req, res, next) {
  PaymentInstance.getSubscriptionLink(req, res);
});


module.exports = router;
