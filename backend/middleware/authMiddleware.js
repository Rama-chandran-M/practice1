const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/utils');

const verifyToken=(req,res,next)=>{
    const token = req.headers['authorization'];
    if(!token){
        return res.status(401).json({message:'Access Denied'});
    }
    const actualtoken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
    jwt.verify(actualtoken,JWT_SECRET,(error,user)=>{
        if(error){
            return res.status(403).json({message:'Invalid Token'});
        }
        req.user = user;
        next();
    })
}
module.exports = verifyToken