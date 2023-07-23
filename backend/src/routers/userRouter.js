const express = require('express')
const router = new express.Router()
const User = require('../models/userModel')
const {sendWelcomeEmail,sendCancelationEmail} = require('../emails/account')
const auth = require('../middleware/auth')
const bcrypt = require('bcryptjs')

//signup user
router.post('/register',async (req,res)=>{
    const {password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User instance with the hashed password
    const user = new User({
      ...req.body,
      password: hashedPassword, // Save the hashed password
    });

    

    try{

        await user.save()
        sendWelcomeEmail(user.email,user.username);
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})


    }
    catch(error)
    {
        console.log(error.message);
        res.status(400).send(error)
    }
    
})


//login user
router.post('/login',async (req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        if(!user)
        {
            
            res.status(404).send({ message:"Invalid User"})
            return
        }
        const token = await user.generateAuthToken()
        res.send({ user , token})
    }
    catch(error)
    {
        console.log(error.message);
        res.status(400).send(error.message)
    }
      
})


//logout user
router.post('/logout',auth,async (req,res) => {
    try{
            req.user.tokens = req.user.tokens.filter((token)=>{
                return token.token !== req.token
            })

            await req.user.save()
            sendCancelationEmail(req.user.email,req.user.username);
            res.send()
    }
    catch(e){
        console.log(e);
        res.status(500).send(e)
    }
})




module.exports = router