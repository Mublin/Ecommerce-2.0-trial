import jwt, { decode } from "jsonwebtoken"

export const generateToken = (user) => {
    return jwt.sign({_id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin}, process.env.JWT_SECRET,{
        expiresIn: "30d"
    })
}

export const isAuth = (req, res, next)=>{
    const {authorization} = req.headers 
    if(authorization){
        const token = authorization.slice(7, authorization.length); //we need the token from authorization object.... BEARER XXXXXXX 
        // THERE ARE SEVEN LETTERS BEFORE AUTH CODE EXPLAINS SLICE 7 
        //it removes the first seven
        jwt.verify(token, process.env.JWT_SECRET, (err, decode)=>{
            if (err){
                res.status(401).send({message: "Invalid Token"});
            } else {
                req.user = decode;
                next();
                // it decodes the token
            }
        }
        )
    } else{
        res.status(401).send({ message : "No Token"})
    }
}