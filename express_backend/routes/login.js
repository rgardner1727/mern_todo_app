const express = require('express');
const router = express.Router();
const user = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res, next) => {
    const { username, password } = req.body;
    try{
        const userByUsername = await user.findOne({username: username});
        if(!userByUsername)
            return res.status(404).send(`User with username '${username}' does not exist.`);
        const matches = await bcrypt.compare(password, userByUsername.password);
        if(!matches)
            return res.status(401).send(`Invalid credentials for user with username '${username}'.`);
        const token = jwt.sign({id: user.id}, 'placeholder_secret_key', {expiresIn: '15m'});
        res.json({token});
    }catch(err){
        console.log(err);
        res.status(500).send(`Error logging in user with username '${username}'.`);
    }
});

module.exports = router;