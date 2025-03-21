const joi = require('joi')

const registerValidation = (data) => {
    console.log(data)
    const schemaValidation = joi.object({
        username:joi.string().required().min(3).max(256),
        email:joi.string().required().min(6).max(256).email(),
        password:joi.string().required().min(6).max(1024)
    })
    return schemaValidation.validate(data)
}

const loginValidation = (data) => {
    const schemaValidation = joi.object({
        email:joi.string().required().min(6).max(256).email(),
        password:joi.string().required().min(6).max(1024)        
    })
    return schemaValidation.validate(data)
}

const postValidation = (data) => {
    const schemaValidation = joi.object({
        title:joi.string().require().max(100),
        description:joi.string().require().max(500),
        likes:joi.number().require()
    })
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation