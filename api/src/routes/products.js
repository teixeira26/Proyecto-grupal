const { Router } = require ('express');
const { Product } = require('../db')
const { Op } = require('sequelize');

const {mercadopago} = require('../utils/mercadoPago');

const router = Router();

const payProduct = async(req, res) => {
    const id = req.params.id
    const cart = req.body.cart
    console.log(cart)
    // const product = await Product.findByPk(id)
    let items = []
    
    cart.forEach(i => items.push({
        title: i.name,
        description: i.description,
        picture_url: i.profilePicture,
        // category_id: i.id,
        quantity: i.quantity,
        unit_price: i.price
    }))

    let preference = {
        payer_email: "test_user_82405251@testuser.com",
        items: items,
        back_urls: {
            failure: "/failure",
            pending: "/pending",
            success: "http://localhost:3000/confirmacion"
        },
        auto_return: 'approved'
    };
    mercadopago.preferences.create(preference)
    .then(response => {
        console.log(response)
        res.set("Access-Control-Allow-Origin", '*');
        res.set("Access-Control-Allow-Methods", 'POST');
        res.set("Access-Control-Allow-Headers", 'Content-Type');
        res.set("Access-Control-Max-Age", '3600');
        res.set("Access-Control-Allow-Credentials", true);
        console.log('URL: ', response.body.init_point)
        res.json({
            global:response.body.id
        })
    })
    .catch(err => console.log(err))
};

router.post('/checkout', payProduct);

router.get('/', async (req, res, next) => {
    const { name } = req.query;
    let allProducts;
    try {
        if (name) {
            allProducts = await Product.findAll({
                where: {
                    name: {
                        [Op.iLike]: '%' + name + '%'
                    }
                }
            })
        } else {
            allProducts = await Product.findAll({
            })
        }
        allProducts ?
            res.status(200).send(allProducts) :
            res.status(400).send('No hay productos cargados')
    } catch (err) {
        next(err)
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    let productById
    try {
        productById = await Product.findByPk(id)
        res.send(productById)
    } catch (error) {
        next(error)
    }
});

router.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    let productById
    try {
        productById = await Product.findByPk(id)
        res.send(productById)
    } catch (error) {
        next(error)
    }
});

router.post('/', async (req, res, next) => {
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
        description
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
            }
        })
        res.status(201).send('Producto agregado con éxito')
    } catch (err) {
        console.log(err)
        next(err)
    }
});

router.put('/:id', async (req, res, next) => {
    const id = req.params.id;
    const product = req.body;
    try {
        await Product.update(product, {
            where: {
                id: id
            }
        })
        return res.json('Producto modificado')
    } catch (err) {
        next(err)
    }
});

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        await Product.update({
            isActive: false
        }, {
            where: {
                id: id
            }
        })
        return res.json('Producto eliminado')
    } catch (err) {
        next(err)
    }
});

module.exports = router;