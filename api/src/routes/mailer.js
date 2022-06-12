
const nodemailer = require('nodemailer')
const { Router } = require('express');

const router = Router();

router.get('/:email',(req, res)=>{
    
    const email = req.params.email;
    console.log(req.params.email)
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        post:465,
        secure:true,
        auth:{
            user:"kurosaki.math@gmail.com",
            pass:"eawqimbamzuplsns"
        }
    })
    var mailOptions = {
        from:"yumpaloompa",
        to:email,
        subject:'Que onda compa',
        text:'T.T'
    }


    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            res.status(402).send(error.message);
        }
        else{
            console.log('Email enviado ')
            res.status(200).send('siii')
        }
    })
})


module.exports = router