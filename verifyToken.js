const { send } = require('express/lib/response')
const jsonwebtoken = require('jsonwebtoken')

function auth(req,res,next){
    const token = req.header('auth-token')
    console.log(token)
    if(!token){
        return res.status(401).send({message:'Access denied'})
    }
    try{
        console.log(process.env.TOKEN_SECRET)
        const verified = jsonwebtoken.verify(token,process.env.TOKEN_SECRET)
        console.log("verified")
        req.user=verified
        next()
    }catch(err){
        return res.status(401).send({message:'Invalid token'})
    }
}

module.exports=auth