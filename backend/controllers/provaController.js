
let Correction = require('../models/correctionModel')
const crypto = require('crypto');

exports.prova = (req, res, next)=>{
    
    const jwtSecret = crypto.randomBytes(64).toString('hex');
    console.log(jwtSecret);
    res.end()
}