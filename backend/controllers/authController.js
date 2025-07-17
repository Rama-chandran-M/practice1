const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/utils');

// Signup Handler
exports.signup = async(req,res)=>{
    const {email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    db.query('INSERT INTO users (email,password) VALUES (?,?)',[email,hashedPassword],(err,result)=>{
        if(err){
            if(err.code === "ER_DUP_ENTRY"){
                return res.status(400).json({message:'User Email Already Exisiting'});
            }
            return res.status(500).json({message:'Database Error'});
        }
        res.json({message:'SignUp Successful'});
    });
};

// Login Handler
exports.login = (req,res)=>{
    const {email,password} = req.body;
    db.query('SELECT * from users where email=?',[email],async(error,result)=>{
        if(error){
            return res.status(500).json({message:'Database error'});
        }
        if(result.length===0){
            return res.status(401).json({message:'No User with this email exits'});
        }
        const user = result[0];
        const match = await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(401).json({message:'Invalid Password'});
        }
        const token = jwt.sign({id:user.id,email:user.email},JWT_SECRET,{expiresIn:'1h'});
        console.log(token);
        res.json(token);
    });
};
