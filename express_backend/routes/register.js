const express = require('express');
const user = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/', async (req, res, next) => {
    const {username, password} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const registeredUser = new user({username: username, password: hashedPassword});
        await registeredUser.save();
        res.status(201).send(`User with username '${username}' registered successfully.`);
    }catch(err){
        console.log(err);
        if(!err.code === 11000)
            res.status(500).send(`Error registering user with username '${username}'.`);
        res.status(401).send(`User with username ${username} already exists.`);
    }
});

module.exports = router;