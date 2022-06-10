const { Router } = require('express');
const ownersRoute = require('./owners.js');
const petsRoute = require('./pets.js');
const providersRoute = require('./providers.js');
const productsRoute = require('./products.js');
const soldsRoute = require('./solds')

const cors = require('cors');

const router = Router();
router.use(cors());

router.use('/owners', ownersRoute);
router.use('/pets', petsRoute);
router.use('/providers', providersRoute);
router.use('/products', productsRoute);
router.use('/solds', soldsRoute)

module.exports = router;
