import mongoose from 'mongoose';
import bcrypt from "bcrypt"
import User from "../models/User.js"
import Employees from "../models/Employees.js"
import jwt from "jsonwebtoken";
import Events from '../models/Events.js';

export const createEvent = async (req, res)=> {
  console.log(req.body)
  const {start, end, title,time, description, type, selectedFlle} = req.body
  try {
      const result = await Events.create({start, end, title, description,time, type, selectedFlle})
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
    const result =await Employees.findOneAndUpdate({_id:empID, 
      'timeSheet.$.day':day},{$set:{'timeSheet.$.title': "Approved"}})
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
    const result = allEmployee.find((ele)=>ele=> ele.timeSheet.title==="Pending" || ele.timeSheet.title==="Submitted")
    if(!result) return res.status(404).json({message:"No Data Found"})
    console.log(result)
    res.status(200).json([allEmployee])

  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const  fetchStats= async(req, res)=>{
      try {
          const employeeCount = await Employees.count()
          const employeesOnLeave = 1
          const timeSheetPending = await Employees.aggregate([
            {$match:  {'timeSheet.tilte':"Pending"}}, 
            { $project:{timeSheet:1, _id:0}}
          ])
          console.log(timeSheetPending)
          
          res.status(200).json({employeeCount, employeesOnLeave, timeSheetPending})

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
        console.log(req.body)
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

          console.log(result._id.toString())
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