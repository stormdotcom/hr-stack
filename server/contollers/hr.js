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
import CabReq from '../models/CabReq.js';
import MigrationReq from '../models/MigrationReq.js';

export const changeProject = async (req, res)=>{
  const {id, project} =req.body
  console.log(req.body)
try {
const result = await Employees.findOneAndUpdate({userID:ObjectId(id)}, {$set:{'projectAllocated.Project': project}})
console.log(result)
if(!result) return res.status(400).json({message:"not created"})
res.status(200).json({status:true})
} catch (error) {
console.log(error.message)
res.status(500).json({message:"Something went wrong"})
}
}

export const changePostion = async (req, res)=>{
      const {id, position} =req.body
  try {
    const result =await Employees.findOneAndUpdate({userID:ObjectId(id)}, {$set:{'Designation.name': position}})
    if(!result) return res.status(400).json({message:"not created"})
    res.status(200).json({status:true})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }
}

export const addDesigination = async (req, res)=>{
  const {text} = req.body 
  let id = '61eb06cf6b7539f49aa3fc2f'
  try {
    const result = await Company.findOneAndUpdate({_id:ObjectId(id)}, {$push:{designations:text}})
    if(!result) return res.status(400).json({message: "Not created"})
    res.status(200).json({status: true})
  } catch (error) { 
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }
}

export const submitPayment = async (req, res)=>{
  const {id, amountPayable, allowance, deductions, month, date} = req.body
  try {
    const result = await Employees.findOne({_id:ObjectId(id)})
    if(result){
      const isMonthExists = result.payments.filter(ele => ele.month ===month)
      if(!isMonthExists.length) {
        const result2 = await Employees.findOneAndUpdate({_id:ObjectId(id)}, 
        {$push:
          {payments:
            {amountPayable, allowance, deductions, month, date}}})
            if(!result2) return res.status(400).json({message:"Not Updated"})
            res.status(200).json({message:"Created"})
      }
      if(isMonthExists.length) return res.status(400).json({message:"Salary for this month all ready Payed"})
    } 
    if(!result) return res.status(400).json({message:"No Employee Found"})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }
}

export const getCurrentMonthTmeSheet =async (req, res)=>{
  const {userID, month} = req.body
  console.log(req.body)
  try {
    const result = await Employees.findOne({_id:ObjectId(userID)})
    if(!result) return res.status(200).json([])
    const { timeSheet} = result;
    const noLeave = timeSheet.filter(ele => ele.title!=="On Leave" )
    res.status(200).json(noLeave)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }
}

export const getMonth = async (req, res)=>{
    let id= "61eb06cf6b7539f49aa3fc2f"
  try {
    const result = await Company.findOne({_id:ObjectId(id)})
    if(!result) return res.status(200).json([])
    res.status(200).json(result.months)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }
}

export const getFullData = async (req, res)=>{
  const {id } = req.query
  try {
    const result = await Employees.findOne({_id:ObjectId(id)})
    if(!result) return res.status(200).json(null)
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }
}

export const getAllEmployeesName = async (req, res)=>{
  try {
    const result = await Employees.find({timeSheet : {$exists:true}, $where:'this.timeSheet.length>0'}, {fullname:1, Designation:1})
    if(!result.length) return res.status(200).json([])
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }
}

export const unsetPerformer = async (req, res)=>{
    const {userID} = req.body
  try {
    const result = await Employees.findOneAndUpdate({userID:ObjectId(userID)}, {$set:{performer:false}})
    if(!result) return res.status(400).json(null)
    res.status(200).json({status:true})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }
}

export const submitAward = async (req, res)=>{

  const {userID,awardType, Description, score} = req.body;
  try {
    if(awardType==='Excellence') {
      const result = await Employees.findOneAndUpdate({userID:ObjectId(userID)}, {$push:{awards:{score,  Description}}})
      if(!result) return res.status(400).json(null)
      res.status(200).json({status:true})
      return
    }
    if(awardType==='Performance') {
      const result = await Employees.findOneAndUpdate({userID:ObjectId(userID)}, {$set:{performer:true}}, {$push:{accomplishments:{ Description}}})
      if(!result) return res.status(400).json(null)
      res.status(200).json({status:true})
      return
    }
    if(awardType==='Contribution') {
      const result = await Employees.findOneAndUpdate({userID:ObjectId(userID)}, {$push:{contributions:{  Description}}})
      if(!result) return res.status(400).json(null)
      res.status(200).json({status:true})
      return
    }
    else return res.status(400).json(null)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }
}

export const getAllManagers = async (req, res)=>{

  try {
    const result = await Employees.find({'Designation.isManager': {$eq:true}})
    if(!result.length) return res.status(200).json(null)
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }
}

export const getAllEmployeesBySkills = async (req, res)=>{

  try {
    const result = await Employees.find({onBoard:{$eq:true}, skillSets:{$exists:true,  $ne: []}},
      { userID: 1, selectedFile: 1, skillSets: 1,Designation:1,empID:1,fullname:1 } )
      if(!result ) return res.status(200).json(null)
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }
}

export const approveSeperation = async (req, res)=>{
  const {reqID, leavingDate,} = req.body
  try {
    
     const result = await MigrationReq.findByIdAndUpdate({_id:ObjectId(reqID)}, {$set: {submittedStatus:true, approvedStatus:true, leavingDate,} })
     const {userID} = result
     const result2 = await Employees.findOneAndUpdate({userID:ObjectId(userID)}, {$set:{migration: {status:true, dateOfLeaving:leavingDate}}})
     if(!result && !result2) return res.status(400).json({message:"Not updated"})
    res.status(200).json({status:true})
  } catch (error) {
    console.log(error.message)
    res.status(400).json({message:"Something went wrong"})
  }
}
export const declineSeperation = async (req, res)=>{
  const {reqID, comments,} = req.body
  try {
    const result = await MigrationReq.findByIdAndUpdate({_id:ObjectId(reqID)}, {$set: {submittedStatus:true, approvedStatus:false, comments,} })
   if(!result) return res.status(400).json({message:"Not updated"})
    res.status(200).json({status:true})
  } catch (error) {
    console.log(error.message)
    res.status(400).json({message:"Something went wrong"})
  }
}

export const getTransferRequest = async (req, res)=>{
  try {
    const result = await MigrationReq.find({leaving:{$eq:false}, submittedStatus:{$eq:false}})
    console.log(result)
    if(!result) return res.status(200).json(null)
    res.status(200).json(result)
  } catch (error) {
    
  }
}

export const getSperationRequest = async (req, res)=>{
  try {
    const result = await MigrationReq.find({leaving:{$eq:true}, submittedStatus:{$eq:false}})
    if(!result) return res.status(200).json(null)
    res.status(200).json(result)
  } catch (error) {
    
  }
}

export const cabDecline = async (req, res)=>{

  const {id, data} = req.body
  try {
    const result = await CabReq.findOneAndUpdate({_id:ObjectId(id)}, {$set:{submittedStatus:true, approved:false, comments:data}})
    if(!result) return res.status(400).json({message:"Not updated"})
    res.status(200).json({status:true})
  } catch (error) {
    console.log(error.message)
    res.status(400).json({message:"Something went wrong"})
  }
}

export const cabApprove = async (req, res)=>{
  const {id} = req.query
  try {
    const result = await CabReq.findOneAndUpdate({_id:ObjectId(id)}, {$set:{submittedStatus:true, approved:true}})
    if(!result) return res.status(400).json({message:"Not updated"})
    res.status(200).json({status:true})
  } catch (error) {
    console.log(error.message)
    res.status(400).json({message:"Something went wrong"})
  }
}

export const getCabRequest = async (req, res)=>{

  try {
    const result =await CabReq.find({submittedStatus: {$eq:false}, approved: {$eq:false}} )
    console.log(result)
    if(!result) return res.status(200).json([])
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }
}

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
  const {id, data} = req.body
  try {
    const result =await Skllls.findOneAndUpdate({_id:ObjectId(id)}, {$set:{approved:true, submittedStatus:true, score:data}})
    const {userID, technology, category, selfRating, type} = result
    const result2 = await Employees.findOneAndUpdate({userID}, {$push:{
      skillSets:{
        technology, category, selfRating, score:data, type,
      } 
    }})
    if(!result && !result2) return res.status(400).json({message:"not updated"})
    res.status(200).json({status:true})
  } catch (error) {
    console.log(error.message)
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
  console.log(req.body)
  const {start, end, title, description, type} = req.body
  try {
      const result = await Events.create(req.body)
      console.log(result)
      if(type=="event") {
        let result2 =await Employees.updateMany({}, {$push: {timeSheet:{start, end, title, description, event:true,}}})
        console.log(result)
        if(result2) return res.status(200).json({status:true})
        res.status(404).json({message:"Not Created"})
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