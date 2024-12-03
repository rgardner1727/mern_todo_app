const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token)
        return res.status(401).send('A token is required to access this resource.');
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err)
            return res.status(403).send('Invalid token.');
        req.user = user;
        next();
    })
}

module.exports = authenticateToken;