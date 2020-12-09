var jwToken = require("jsonwebtoken");

module.exports.Signature = "234567834567DFGHJKL";

module.exports.middleware = (req,res,next)=>{
    const auth = req.headers.authorization;
    if(auth){
        let result = jwToken.verify(auth,this.Signature);
        if(result.email!==null){
            next();
        }else{
            return res.send({error:true});
        }
    }else{
        return res.send({error:true});
    }
}

