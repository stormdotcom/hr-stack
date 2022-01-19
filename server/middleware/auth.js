
import jwt from "jsonwebtoken";
export const auth = (req, res, next)=>{

    try {
      console.log(req.headers.Authorization)
      const token = req.headers.Authorization.split(" ")[1];

      if(!token)  return  res.status(401).json({messsage: "Unauthorized" })

      const data =  jwt.decode(token, 'secret')

      req.userId = data.user

      next();
      
    } catch (error) {
        console.log(error.message)
        res.status(401).json({messsage: "Unauthorized" })
        
    }
}