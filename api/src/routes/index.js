const { Router } = require('express');
const ownersRoute = require('./owners.js');
const petsRoute = require('./pets.js');
const providersRoute = require('./providers.js');
const productsRoute = require('./products.js');
const soldsRoute = require('./solds.js')
const eventsRoute = require('./events.js');
const reviewsRoute = require('./reviews.js')
const cors = require('cors');

const router = Router();
router.use(cors());

router.use('/owners', ownersRoute);
router.use('/pets', petsRoute);
router.use('/providers', providersRoute);
router.use('/products', productsRoute);
router.use('/solds', soldsRoute)
router.use('/events', eventsRoute);
router.use('/reviews', reviewsRoute);

module.exports = router;
