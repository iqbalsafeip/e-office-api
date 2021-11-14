const jwt = require('jsonwebtoken');

function checkUserAuth(req ,res ,next){

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, 'eoffice');
        req.userData = decodedToken;
        next();
    } catch(err){
        return res.status(401).json({
            message: 'invalid or expired token',
            error : err,
        })
    }
}

module.exports = checkUserAuth