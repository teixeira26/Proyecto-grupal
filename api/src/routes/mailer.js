
const nodemailer = require('nodemailer')
const { Router } = require('express');

const router = Router();

router.post('/',(req, res)=>{
    const {email, subject, text} = req.body
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
        subject:subject,
        text:text
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