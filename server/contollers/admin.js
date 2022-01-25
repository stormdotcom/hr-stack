import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { ObjectId } from 'mongodb';
import Admin from "../models/Admin.js"
import jwt from "jsonwebtoken"
import Employees from "../models/Employees.js"
import Assets from "../models/Assets.js"
import Issues from "../models/Issues.js"
import Company from "../models/Company.js";

export const createCompany = async (req, res)=>{
    try {
        let projects = ["Development & Production", "Services", "Operations", "Cloud"];
        let locations = ["Banglore", "Trivandrum", "Delhi", "Hydrabad"]
        let designations = ["Software Engineer", "DevOps Engineer", "Web Developer", "UI-UX Designer", "Cloud Engineer", "Cyber Sec Engineer"]
        const result = await Company.create({projects, locations, designations,} )
        if(!result) return res.status(400).json({message:"not created"})
        res.status(200).json(result)
    } catch (error) {
        console.log(error.message)
        res.status(500).json(error.message)
    }
}

export const addProject = async (req, res)=>{
    const {data} = req.body
    try {
        const result = await Company.updateMany({$push:{projects:data}})
        if(!result) return res.status(400).json({message:"not created"})
        res.status(200).json(result)

    } catch (error) {
        console.log(error.message)
        res.status(500).json(error.message)
    }
}

export const addLocation = async (req, res)=>{
    const {data} = req.body
    try {
        const result = await Company.updateMany({$push:{locations:data}})
        if(!result) return res.status(400).json({message:"not created"})
        res.status(200).json(result)

    } catch (error) {
        console.log(error.message)
        res.status(500).json(error.message)
    }
}

export const delayIssue = async (req, res)=>{

    const {id, data} = req.body;

    try {
        const result = await Issues.findOneAndUpdate({_id:ObjectId(id)}, {onDelay:true, comments:data})
   
        if(!result) return res.status(400).json({message: "not updated"})

        res.status(200).json({message: "not updated"})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message: "something went wrong"})
    }
}

export const resolveIssue = async (req, res)=>{

    const {id, data} = req.body;
    try {
        const result = await Issues.findOneAndUpdate({_id:ObjectId(id)}, {resolved:true, comments:data})
   
        if(!result) return res.status(400).json({message: "not updated"})

        res.status(200).json({message: "not updated"})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message: "something went wrong"})
    }
}

export const  fetchStats= async(req, res)=>{
    try {
        const employeeCount = await Employees.count()
        const totalAssets =  await Assets.count()
        // const pendingTickets = await Tickets.count()
        const pendingTickets =  await Issues.find({}, {resolved:{ne:true}}).count()
        const result2 =  await Issues.find( {priority:'High'})
        const onDelayTickets =  await Issues.find({}, {onDelay:{ne:true}}).count()
        const result3 = await Assets.find({}, {availableStatus: {ne:false}})
        let availbleAssets = result3.length
        let highPriorityTickets = result2.length
        res.status(200).json({employeeCount, totalAssets, pendingTickets, highPriorityTickets, onDelayTickets, availbleAssets})

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
