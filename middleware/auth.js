import jwt from "jsonwebtoken";

export const auth= () => {
    return   (req, res, next) => {
   let {authorization}= req.headers;
   try{
   jwt.verify(authorization, process.env.jwt_secret, (err, decoded) => {
   req.newId= decoded.data.id;
   req.newRole= decoded.data.role;
   })
   next();
   }
   catch(err){
       res.json({message: err.message})
   }
    }
   };
   
   export const restrictTo= (...roles) => {
   return (req, res, next) => {
       if(!roles.includes(req.newRole)){
       return res.json({message: "you don't have permission to perform this action"});
       };
       next();
   }
   }