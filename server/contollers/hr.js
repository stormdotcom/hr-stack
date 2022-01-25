import mongoose from 'mongoose';
import {ObjectId} from "mongodb"
import bcrypt, { compareSync } from "bcrypt"
import User from "../models/User.js"
import Employees from "../models/Employees.js"
import jwt from "jsonwebtoken";
import Events from '../models/Events.js';
import { dateToEpoch2 } from "../helpers/datehelper.js";
import LeaveManage from '../models/LeaveMange.js';
import Learnings from '../models/Learnings.js';
import Company from '../models/Company.js';
import Skllls from '../models/SkillsReq.js';

export const createAnnouncement = async (req, res)=>{
  try {
    const result = await Events.create(req.body)
    if(!result) return res.status(400).json({message:"not created"})
    res.status(200).json({status:true})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }
}

export const skillApprove = async(req, res)=>{
  console.log(req.body)
  try {
    const result =await Skllls.findOneAndUpdate({_id:ObjectId(id)}, {$set:{approved:true, submittedStatus:true, score:data}})
    if(!result) return res.status(400).json({message:"not updated"})
    res.status(200).json({status:true})
  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
}

export const skillreject = async(req, res)=>{
  const {id, data} = req.body
  try {
    const result =await Skllls.findOneAndUpdate({_id:ObjectId(id)}, {$set:{comments:data, submittedStatus:true}})
    if(!result) return res.status(400).json({message:"not updated"})
    res.status(200).json({status:true})
  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
}

export const getSkillsRequest = async (req, res)=>{

  try {
    const result = await Skllls.find({submittedStatus:{$eq:false}})
    if(!result.length) return res.status(200).json([])
    res.status(200).json(result)
  } catch (error) { 
    console.log(error.message)
    res.status(200).json({message: "something went wrong"})
  }
}

export const saveProfile = async (req, res)=>{
  const {userID, formData} = req.body
  try {
    const result = await Employees.findOneAndUpdate({userID}, {$set:formData})
    if(!result) return res.status(400).json({message:"Profile not Updated"})
    res.status(200).json({status:true})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"something went wrong"})
  }
}
export const addDesignations = async (req, res)=>{
  const {data} = req.body
  try {
      const result = await Company.updateMany({$push:{designations:data}})
      if(!result) return res.status(400).json({message:"not created"})
      res.status(200).json(result)

  } catch (error) {
      console.log(error.message)
      res.status(500).json(error.message)
  }
}

export const fetchCompanyInfo = async (req, res)=>{
  try {
    const result = await Company.aggregate([{ $project : {designations:1,projects:1,locations:1, _id:0 } }])
    if(!result) return res.status(400).json({message:"No Company Data found"})
    res.status(200).json(result[0])
  } catch (error) {
    console.log(error.message)
    res.status(500).json(error.message)
  }
}
export const getAllEmployees = async (req, res)=>{
  try {
    const result = await Employees.find()
    if(!result) return res.status(400).json({message:"No Employee Data found"})
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const declineLearning = async (req, res)=>{
  const  {id} = req.body 
  console.log(id)
  try {
    const result = await Learnings.findOneAndUpdate({_id:ObjectId(id)},{$set:{rejectedStatus:true}})
    if(!result) return res.status(400).json({message:"No data updated"})
    res.status(200).json({status:true})
  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
}

export const approveLearning = async (req, res)=>{
  const {userID, videoURL} = req.body
  try {
    const result = await Learnings.findOneAndUpdate({_id:ObjectId(userID)}, {$set:{approvedStatus:true, videoID:videoURL}})
    if(!result) return res.status(400).json({message:"Not updated"})
    res.status(200).json({status:true})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }
}

export const getAllLeaveRequest = async(req, res)=>{
  try {

    const result = await LeaveManage.find({submittedStatus: {$eq:false}})
      if(!result.length) return res.status(200).json([])
      res.status(200).json(result)
    
  } catch (error) { 
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }
}

export const getLearningRequest = async(req, res)=>{
  try {
      const result = await Learnings.find({approvedStatus:false})
      if(!result) return res.status(400).json({message:"no data found in learnings"})
      res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
    res.status(500).json(error.message)
    
  }
}


export const createEvent = async (req, res)=> {

  const {type,isAnnouncements,} = req.body
  try {
      const result = await Events.create(req.body)
      console.log(result)
      if(type=="event") {
        let result =await Employees.updateMany({}, {$push: {timeSheet:{start, end, title, description}}})
      }
      if(result) return res.status(200).json({status:true})
      res.status(404).json({message:"Not Created"})
  } catch (error) {
    res.status(500).json({message:"Something went Wrong"})
    console.log(error.message)
  }
}
export const timeSheetApprove = async (req, res)=>{
  const {empID, day} = req.body;
try {
    const result =await Employees.findOneAndUpdate({_id:ObjectId(empID), 
      'timeSheet.day':day},{$set:{'timeSheet.$.title': "Approved"}})
      if(result) return res.status(200).json({status:true})
      res.status(404).json({message:"No timesheet data found"})
} catch (error) {
  res.status(500).json(error.message)
  console.log(error.message)
}
    
}
export const getPendingTimeSheet = async(req, res)=>{

  try {
    const allEmployee = await Employees.aggregate([ {$project:{timeSheet:1, fullname:1, projectAllocated:1}}  ])
    if(!allEmployee) return res.status(404).json({message:"No employees Found"})
    const result = allEmployee.find((ele)=>ele=> ele.timeSheet.title==="Pending"  &&  ele.timeSheet.title==="Submitted")

    if(!result) return res.status(404).json({message:"No Data Found"})

    res.status(200).json([allEmployee])

  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const  fetchStats= async(req, res)=>{
  const day=  dateToEpoch2(new Date)
      try {
          const employeeCount = await Employees.count()
          const result0 =await Employees.aggregate([ {$match:  {'timeSheet.tilte':"Pending"}}, 
            { $project:{timeSheet:1, _id:0}} ])
          const result = await Employees.aggregate([
            {$match:  {'timeSheet.tilte':"Pending"}}, 
            { $project:{timeSheet:1, _id:0}}
          ])
          const result1 = await Employees.find({ onBoard: false })
          const result2 = await Employees.find({'timeSheet.$.day':day})
          let timeSheetPending =result.length
          let onboardPending = result1.length
          let employeesOnLeave =result0.length
          let notSubmittedToday = result2.length
          res.status(200).json({employeeCount, employeesOnLeave, timeSheetPending, onboardPending, notSubmittedToday})

      } catch (error) {

        res.status(500).json({message:error.message})
        
        console.log(error.message)
      }
}
export const  fetchAllEmployeData= async(req, res)=>{
  try {
      const employeeData = await Employees.findAll()
      
      res.status(200).json(employeeData)

  } catch (error) {
    res.status(500).json({message:error.message})
    console.log(error.message)
  }
}

export const signin = async (req, res)=>{

        const {email, password} = req.body;

        try {
            if(!email || !password) return  res.status(401).json({ message: "Bad credentials"})

            const userExists = await User.findOne({email})
            
            if(!userExists) return  res.status(404).json({ message: "User dosen't exists"})
            
            if(!userExists.AccessStatus) return  res.status(401).json({ message: "User blocked"})

            if(!userExists.isHR) return  res.status(404).json({ message: "Unauthorized"})

            const isPassword = await bcrypt.compare(password, userExists.password)

            if(!isPassword) return  res.status(403).json({message: "Invalid credentials"})
   
            const token = jwt.sign({id: userExists._id, email: userExists.email }, 'secret', {expiresIn: '1h'})
            

            let result = {...userExists._doc, password:null}

            res.status(200).json({result, token})

            // res.cookie('user', token, { httpOnly: true}).send()
            
        } catch (error) {
            res.status(500).json(error.message);
        }
}

export const createHR = async (req, res)=>{
        const { email, password, fullname } = req.body;
      
        try {
          const oldUser = await User.findOne({ email });
      
          if (oldUser) return res.status(400).json({ message: "User already exists" });
      
          const hashedPassword = await bcrypt.hash(password, 12);

          const result = await User.create({ email, password: hashedPassword, fullname,});
          await User.findOneAndUpdate({_id:result._id}, {isHR:true})
          const token = jwt.sign({id: result._id, email: result.email }, 'secret')

          const nameLowerCase = fullname.toLowerCase().replace(/\s/g, '')

          let code = result._id.toString()
              code = code.substr(code.length - 5).toUpperCase();

          let empID = "EC"+code;

          const organisationEmail= nameLowerCase+"@exampleCompany.com"

          await Employees.create({userID:result._id, fullname, email, organisationEmail, dateOfJoin:result.createdAt, empID, })

            res.cookie('user', token, { httpOnly: true}).send()
        //   res.status(201).json({  message: "Sign In successfully"  });
        } catch (error) {
          res.status(500).json({ message: "Something went wrong" });
          
          console.log(error);
        }

}
export const logout = async(req, res)=>{

    res.cookie("user", "", { httpOnly: true, expires: new Date(0)}).send()

}