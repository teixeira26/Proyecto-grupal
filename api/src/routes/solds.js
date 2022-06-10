const { Router } = require("express");
const { Product, Sold } = require("../db");
const router = require("./products");

router.post("/", async(req,res,next) => {
    const {id }= req.body;
    console.log("BOODYYYYYY",id);
    res.json("RESPUESTA")
})

module.exports = router