import mongoose from "mongoose"
import bcrypt from "bcrypt"
import Admin from "../models/Admin.js"
import jwt from "jsonwebtoken"
import Employees from "../models/Employees.js"
import Assets from "../models/Assets.js"

export const  fetchStats= async(req, res)=>{
    try {
        const employeeCount = await Employees.count()
        const totalAssets =  await Assets.count()
        // const pendingTickets = await Tickets.count()
        const pendingTickets = 3
        res.status(200).json({employeeCount, totalAssets, pendingTickets})

    } catch (error) {
      res.status(500).json({message:error.message})
      
      console.log(error.message)
    }
}

export const addAsset = async(req, res)=>{
    const { assetName,assetModel, assetCategory, assetType, description} = req.body;
    try {
        const result = await Assets.create({assetName, assetModel, assetCategory, assetType, description})

        if(!result) return res.status(404).json({message:"Asset Not Created"})

        let code = result._id.toString()
        code = code.substr(code.length - 4).toUpperCase();
        let assetCode = "EC-Asset-"+code;

        let result1 = await Assets.findOneAndUpdate({_id:result._id}, {assetCode,})

        if(!result1) return res.status(404).json({message:"Asset Not updated"})

        res.status(200).json({status:true})

    } catch (error) {
        res.status(500).json(error.message)
        console.log(error.message)
    }
}

export const adminSignin = (async(req, res)=>{
    const{ email, password} = req.body;
    console.log(req.body)
    try {
        if(!email || !password) return  res.status(404).json({ message: "Bad credentials"})

        const userExists = await Admin.findOne({email})

        if(!userExists) return  res.status(404).json({ message: "No User"})

        if(!userExists.isAdmin) return  res.status(404).json({ message: "No Authoirzation"})

        const isPassword = await bcrypt.compare(password, userExists.password)

        if(!isPassword) return  res.status(403).json({message: "Invalid credentials"})

        const token = jwt.sign({id: userExists?._id, email: userExists.email }, 'secret', {expiresIn: '1h'})

        let result = {...userExists._doc, password:null}

        res.status(200).json({result, token})

        // res.cookie('user', token, { httpOnly: true}).send()
        
    } catch (error) {
        res.status(500).json(error.message);
    }
})

export const createAdmin = async (req, res)=>{

    const { email, password, fullname } = req.body;
  
    try {
      const oldUser = await Admin.findOne({ email });

      console.log(oldUser)

      if (oldUser) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 12);

      const result = await Admin.create({ email, password: hashedPassword, fullname,});

      const token = jwt.sign({id: result._id, email: result.email }, 'secret')

      const nameLowerCase = fullname.toLowerCase().replace(/\s/g, '')

      const organisationEmail= nameLowerCase+"@exampleCompany.com"

      console.log(result._id.toString())
      let code = result._id.toString()
          code = code.substr(code.length - 5).toUpperCase();
      let empID = "EC"+code;

      console.log(empID)
      await Employees.create({userID:result._id, fullname, email, organisationEmail, dateOfJoin:result.createdAt, empID})

        res.cookie('user', token, { httpOnly: true}).send()
    //   res.status(201).json({  message: "Sign In successfully"  });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      
      console.log(error);
    }

}
