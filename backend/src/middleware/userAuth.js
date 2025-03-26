const joi = require('joi');

const signupValidation=(req,res,next)=>{
     const Schema = joi.object.keys({
        username: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),

     });

     const {error} = Schema.validate(req.body);
     if(error){
        return res.json({message: error.message});
     };

     next();




};

const loginValidation = (req, res, next) => {
    const Schema = joi.object().keys({
        email: joi.string().email().required(),
        password: joi.string().required()
    });

    const {error} = Schema.validate(req.body);
    if(error){
        return res.json({message:error.message});
    };

    next();
};

module.exports = {signupValidation, loginValidation};