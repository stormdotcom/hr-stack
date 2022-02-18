import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { ObjectId } from 'mongodb';
import Admin from "../models/Admin.js"
import jwt from "jsonwebtoken"
import Employees from "../models/Employees.js"
import Assets from "../models/Assets.js"
import Issues from "../models/Issues.js"
import Company from "../models/Company.js";
import AssetReq from "../models/AssetReq.js";
import User from "../models/User.js";


export const updateAsset = async (req, res)=>{
    const {id, assetName, assetModel, assetCategory, assetType, description} = req.body
    try {
        const result = await Assets.findOneAndUpdate({_id:ObjectId(id)}, {$set:{assetName, assetModel, assetCategory, assetType, description}})
        if(!result) return res.status(400).json({message: "Not created"})
        res.status(200).json({status: true})  
    } catch (error) {
        console.log(error.message)
        res.status(500).json(error.message)
    }
}

export const updatePassword = async (req, res)=>{
    const {id, newPassword} = req.body
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        const result = await User.findOneAndUpdate({_id:ObjectId(id)}, {$set:{password: hashedPassword}})
        if(!result) return res.status(400).json({message: "Not created"})
        res.status(200).json({status: true})  
    } catch (error) {
        console.log(error.message)
        res.status(500).json(error.message)
    }
}

export const addHolidays = async (req, res)=>{
    const {text} = req.body
    let id = '61eb06cf6b7539f49aa3fc2f'
    try {
        const result = await Company.findOneAndUpdate({_id:ObjectId(id)}, {$push:{holidays:text}})
        if(!result) return res.status(400).json({message: "Not created"})
        res.status(200).json({status: true})  
    } catch (error) {
        console.log(error.message)
        res.status(500).json(error.message)
    }
}

export const addMonths = async (req, res)=>{
    let id = '61eb06cf6b7539f49aa3fc2f'
    try {
        const result = await Company.findOneAndUpdate({_id:ObjectId(id)}, {$push:{months:req.body}})
        if(!result) return res.status(400).json({message:"not created"})
        res.status(200).json({status:true})

    } catch (error) {
        console.log(error.message)
        res.status(500).json(error.message)
    }
}

export const deleteUser = async (req, res)=>{
    const {id} = req.query
    try {
    const result = await User.deleteOne({_id:ObjectId(id)})
    const result2 = await Employees.deleteOne({userID:ObjectId(id)})
    if(!result && !result2) return res.status(400).json({message:"not updated"})
    res.status(200).json({status:true})
    } catch (error) {
        console.log(error.message)
        res.status(200).json({message:"Something went wrong"})
    }
}

export const unBlockUser = async (req, res)=>{
    const {id} = req.query
    try {
        const result = await User.findOneAndUpdate({_id:ObjectId(id)}, {$set:{AccessStatus:true}})
        if(!result) return res.status(400).json({message:"not updated"})
        res.status(200).json({status:true})
    } catch (error) {
        console.log(error.message)
        res.status(200).json({message:"Something went wrong"})
    }
}

export const blockUser = async (req, res)=>{
    const {id} = req.query
    try {
    const result = await User.findOneAndUpdate({_id:ObjectId(id)}, {$set:{AccessStatus:false}})
    if(!result) return res.status(400).json({message:"not updated"})
    res.status(200).json({status:true})
    } catch (error) {
        console.log(error.message)
        res.status(200).json({message:"Something went wrong"})
    }
}

export const getAllEmployeesList = async (req, res)=>{
    try {
      const result = await Employees.aggregate([     {
        $lookup:
          {
            from: "users",
            localField: "userID",
            foreignField: "_id",
            as: "AllEmployees"
          }
     }
     ,
     {$unwind:"$AllEmployees"},
     {   
      $project:{
          _id : 0,
          userID:1,
          fullname : 1,
          empID:1,
          projectAllocated:1,
          dateOfJoin:1,
          migration:1,
          "AllEmployees.AccessStatus":1,
      } 
  }])
      if(!result) return res.status(400).json({message:"No Employee Data found"})
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error.message)
    }
  }

export const declineAssetReq = async (req, res)=>{
    const {id, data} = req.body
    console.log(req.body)
    try {
        const result = await AssetReq.findOneAndUpdate({_id:ObjectId(id)}, {$set:{approved:false, submitted:true}})
        if(!result) return res.status(400).json({message:"not created"})
        res.status(200).json({status:true})
    } catch (error) {
        console.log(error.message)
        res.status(200).json({message:"Something went wrong"})
    }
}

export const returnAsset = async (req, res)=>{
    const {id} = req.query
    try {
        const result = await Assets.findOneAndUpdate({_id:ObjectId(id)}, {$set: {availableStatus: true, alloactedTo: null, alloactedDate:null}})
        if(!result) return res.status(400).json({message:"no updated"})
        res.status(400).json({status:true})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message:"seomthing went wrong"})
    }
}

export const getAllAssetsHolding = async (req, res)=>{

    try {
        const result = await Assets.aggregate( [ {$match: { availableStatus:{$eq:false}}},
            {
              $lookup:
                {
                  from: "employees",
                  localField: "alloactedTo",
                  foreignField: "userID",
                  as: "allocated"
                }
           }
           ,
           {$unwind:"$allocated"},
           {   
            $project:{
                _id : 1,
                assetName : 1,
                assetModel:1,
                assetCategory:1,
                assetCode:1,
                "allocated.fullname":1,
                "allocated.empID":1
            } 
        }
         ] )
        if(!result.length) return res.status(200).json([])
       
        res.status(200).json(result)
    } catch (error) {
        console.log(error.message)
        res.status(200).json({message:"something wend wrong"})
    }
}

export const setAsset = async (req, res)=>{
    const {reqId, assetId, userID} = req.body
    console.log(req.body)
    try {
        const result = await Assets.findOneAndUpdate({_id:ObjectId(assetId)}, {$set:{availableStatus:false, alloactedTo:ObjectId(userID), alloactedDate: new Date}})
        const result2 = await AssetReq.findOneAndUpdate({_id:ObjectId(reqId)}, {$set:{submitted:true, approved:true, submittedDate:new Date, assetID:assetId}})
        if(!result && !result2) return res.status(400).json({message:"No changes done"})
        console.log(result)
        console.log(result2)
        res.status(200).json({message:"changes Saved and updated done"})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message:"Something went worng"})
    }
}

export const getAllAssets = async (req, res)=>{

    try {
        const result = await Assets.find({availableStatus:{$eq:true}})
        if(!result.length) return res.status(200).json([])
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
    }
}

export const getAssetRequest = async (req, res)=>{

    try {
      const result = await AssetReq.find({approve:{$eq:false}, submitted:{$eq:false}})
      if(!result.length) return res.status(200).json([])
      res.status(200).json(result)  
    } catch (error) {
      console.log(error.message)
      res.status(500).json({message:"Something went wrong"})
    }
  }

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
    const {text} = req.body
    try {
        const result = await Company.updateMany({$push:{projects:text}})
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
        const pendingTickets =  await Issues.find({resolved:{$ne:true}}).count()
        const result2 =  await Issues.find( {priority:'High', resolved:{$ne:true}})
        const onDelayTickets =  await Issues.find({}, {onDelay:{ne:true}}).count()
        const result3 = await Assets.find({availableStatus: {$eq:true}})
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
