import { ObjectId } from 'mongodb';
import bcrypt from "bcrypt"
import User from "../models/User.js"
import Employees from "../models/Employees.js"
import jwt from "jsonwebtoken";
import { dateToEpoch2 } from "../helpers/datehelper.js";
import Events from "../models/Events.js";
import Issues from "../models/Issues.js"
import LeaveManage from "../models/LeaveMange.js";
import Learnings from "../models/Learnings.js"
import Skllls from "../models/SkillsReq.js";
import AssetReq from "../models/AssetReq.js";
import Assets from "../models/Assets.js";
import CabReq from "../models/CabReq.js";
import MigrationReq from "../models/MigrationReq.js";
import Notification from "../models/Notifications.js";
import Company from '../models/Company.js';

export const getNotification = async (req, res)=>{
  const {id}= req.query

  const result = Notification.findOne({user:ObjectId(id)})
  if(!result) res.status(400).json({message:"No notifications"})
  const notification =   result?.notification ? result?.notification.slice : []
  res.status(200).json(notification)

  try {
    
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Something went wrong"})
  }
}

export const getPerformer = async (req, res)=>{
  try {
    const result = await Employees.aggregate([{ $match:{performer:{$eq:true}}}, 
      { $project:{
        performer:1, selectedFile: 1, fullname: 1, userID:1,  Designation: 1, projectAllocated:1
      } }])
        if(!result) return res.status(200).json(null)
      
    res.status(200).json(result)

  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }
}

export const getTransferInfo = async (req, res)=>{
  const {id} = req.query
  try {
    const result = await MigrationReq.find({userID:id, leaving:{$eq:false}})
    console.log(result)
    if(!result) return res.status(200).json(null)
    res.status(200).json(result[result.length - 1])
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }
}

export const submitTransfer = async (req, res)=>{ 
  console.log(req.body)
  try {
    const result = await MigrationReq.create(req.body)
    console.log(result)
    if(!result) return res.status(400).json({message:"request not created"})
    res.status(200).json({staus:true})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }
}

export const getSeperationInfo = async (req, res)=>{
  const {id} = req.query
  try {
    const result = await MigrationReq.find({userID:id, leaving:{$eq:true}})
    if(!result) return res.status(200).json(null)
    res.status(200).json(result[result.length - 1])
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }
}

export const submitSeperation = async (req, res)=>{
  console.log(req.body)
  try {
    const result = await MigrationReq.create(req.body)
    if(!result) return res.status(400).json({message:"request not created"})
    res.status(200).json({staus:true})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }
}

export const myCabs = async (req, res)=>{
  const {id}= req.query
  try {
    const result = await CabReq.find({userID:id})
    if(!result) return res.status(200).json([])
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }
}

export const checkCabStatus = async (req, res)=>{
  const {id} = req.query
  try {
    const result = await CabReq.findOne({userID:id})
    if(!result) return  res.status(200).json({status:false})
    if(result.approved) return  res.status(200).json({status:true})
    if(!result.approved && !result.submittedStatus) return  res.status(200).json({status:false, message:"Uh Already requested, please be patient for request to fullfill"})
  } catch (error) {
    console.log(error.message)
    res.status(400).json({message:"Something went wrong"})
  }
}

export const submitCabRequest = async (req, res)=>{

  console.log(req.body)
  try {
    const result = await CabReq.create({...req.body})
    console.log(result)
    if(!result) return res.status(400).json({message:"not created"})
    res.status(200).json({status:true})
  } catch (error) {
    console.log(error.message)
    res.status(200).json({message:"Something went wrong"})
  }
}

export const getMyassets = async (req, res)=>{
  const {id} = req.query
  try {
    const result = await Assets.find({alloactedTo:ObjectId(id)})
    if(!result.length) return res.status(200).json([])
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
    res.status(400).json({message:"Something went wrong"})
  }
}

export const submitAssetReq = async (req, res)=>{
  const {userID} = req.body
  try {
    const result = await AssetReq.create(req.body)
    if(!result) return res.status(400).json({message:"no created"})
    res.status(200).json({status:true})
  } catch (error) {
    console.log(error.message)
    res.status(400).json({message:"Something went wrong"})
  }
}
export const submitProfilePhoto = async(req, res)=>{
  const {userID, formdata} = req.body
  const {selectedFile,filePublicID,  asset_id } = formdata
  try {
    const result =await Employees.findOneAndUpdate({userID:ObjectId(userID)}, {$set:{selectedFile, filePublicID,  asset_id}})
    if(!result) return res.status(400).json({message:"not created"})
    res.status(200).json({status:true})
  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
}

export const getAnnouncements = async (req, res)=> {
  try {
    let events = await Events.find({isAnnouncements:{$eq:true}}).sort({_id:-1}).limit(1)
    console.log(events)
    
    if(!events) return res.status(404).json({message:"No Events found"})

    res.status(200).json(events[0])

  } catch (error) {
    res.status(404).json(error.message)
  }
}

export const getMyskills = async (req, res)=>{
  const { id } =  req.query

  try {
    const result = await Skllls.find({userID:ObjectId(id), approved:{$eq:true}})
    if(!result.length) return res.status(200).json(null)
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: "Something went wrong"})
  }
}

export const submitSkills = async(req, res)=>{
  const  {userID} =req.body
  try {
    const form = {...req.body, userID:ObjectId(userID)}
    const result =await Skllls.create(form)
    if(!result) return res.status(400).status({message:"Not submited"})
    res.status(200).json({status:true})
  } catch (error) {
    console.log(error.message)
    res.status(400).status({message:"Something went wrong"})
  }
}

export const submitAddress = async (req, res)=>{
  const {address, userID} = req.body
  try {
    const result =await Employees.findOneAndUpdate({userID}, {$set:{address2: address}})
    if(!result) return res.status(400).json({message:"Not created"})
    let result2= await Employees.findOne({userID})
    res.status(200).json(result2)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }
}

export const submitPersonalInfo = async (req, res)=>{
  const {data, userID} = req.body
  const {fatherName, motherName, BloodGroup, contactPerson, place, phoneNumber}= data
  try {
    const result =await Employees.findOneAndUpdate({userID}, {$set:{personalDetails: {fatherName, motherName, BloodGroup}
                                    , emergencyContact:{contactPerson, place, phoneNumber}}})
    if(!result) return res.status(400).json({message:"Not created"})
    let result2= await Employees.findOne({userID})
    res.status(200).json(result2)
  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
}

export const getMyLearnings = async (req, res)=>{
  const {id} = req.query
  try {
    const result = await Learnings.find({userID:id, approvedStatus: {$eq: true}})
    if(!result) return res.status(400).json({message:"no e-learnings found"})
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
  }
}

export const submitLearningRequest = async (req, res)=>{
  console.log(req.body)
  try {
    const result = await Learnings.create(req.body)
    if(!result) return res.status(400).json({message:"No created"})
    res.status(200).json({status:true})
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const checkLeaveStatus = async(req, res)=>{
  const {id} = req.query
  try {
    const result =await LeaveManage.aggregate([ {$sort: {fromDate: -1}}, {$limit: 2},{$match: {userID: id}}])
    if(!result.length) return res.status(200).json(null)
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
    res.status(500).json(error.message)
  }
}

export const setPriority = async (req, res)=>{
  const {id, Priority} = req.body;
  try {
    const result = await Issues.findOneAndUpdate({_id:ObjectId(id)}, {$set:{priority:Priority}})
    if(!result) return res.status(400).json({message: "Can't update"})
    res.status(200).json({status:true})

  } catch (error) {
    console.log(error.message)
    res.status(400).json({message: "Seomething went wrong"})
    
  }
}

export const myTickets = async (req, res)=>{
  const {userID} = req.query;
  try {
      const result =await Issues.find({userID}, {resolved:false})
      if(!result) return res.status(400).json({message: "No Tickets found"})
      res.status(200).json(result)
  } catch (error) {
    res.status(400).json({message: "Something went wrong"})
  }
}
export const allActiveTicket = async (req, res)=>{
  try {
      const result =await Issues.find({resolved:false})
      if(!result) return res.status(400).json({message: "No Tickets found"})
      res.status(200).json(result)
  } catch (error) {
    res.status(400).json({message: "Something went wrong"})
  }
}

export const submitTicket = async(req, res)=>{
  try {
    const result = await Issues.create(req.body)
    if(!result) return res.status(400).json({message:"not created"})
    res.status(200).json({status:true})
  } catch (error) {
    console.log(error.message)
    console.log(error.message)
    res.status(500).json({message:"Something went wrong"})
    
  }
}

export const leaveApprove = async(req, res) =>{
  const {id, userID, fromDate, toDate, leaveType} = req.body

  const date = dateToEpoch2(new Date(fromDate))
  const dateNow  = new Date();
  const month = dateNow.getMonth()+1;  
  const year = dateNow.getYear();
if(leaveType==="Casual") {
  await LeaveManage.findOneAndUpdate({_id:ObjectId(id)}, {$set:{approvedStatus:true, submittedStatus:true}}).then(async(result)=>{
     await Employees.findOneAndUpdate({userID:ObjectId(userID)},{$inc:{'leaveBalance.casual': -1}},
   ).then(async (result)=>{
    await Employees.findOneAndUpdate({userID:ObjectId(userID)},
    {$push:{timeSheet:{
      start:fromDate, 
      day:date,
      year:year,
      month:month,
      title:"On Leave", 
      end:toDate,  
      hours:0
      }}} ).then((result)=>{  
      res.status(200).json({status:true})
      }).catch((err=> res.status(400).json(err.message)))
    }).catch((err=> res.status(400).json(err.message)))
  }).catch((err)=> res.status(404).json(err.message))
}
if(leaveType==="Sick") {
  await LeaveManage.findOneAndUpdate({_id:ObjectId(id)}, {$set:{approvedStatus:true, submittedStatus:true}}).then(async(result)=>{
    await Employees.findOneAndUpdate({userID:ObjectId(userID)},{$inc:{'leaveBalance.sick': -1}},
  ).then(async (result)=>{
   await Employees.findOneAndUpdate({userID:ObjectId(userID)},
   {$push:{timeSheet:{
     start:fromDate, 
     day:date,
     title:"On Leave", 
     end:toDate,  
     hours:0
     }}} ).then((result)=>{  
     res.status(200).json({status:true})
     }).catch((err=> res.status(400).json(err.message)))
   }).catch((err=> res.status(400).json(err.message)))
 }).catch((err)=> res.status(404).json(err.message))
}
}
export const leaveDecline = async(req, res) =>{
  const {userID, data} = req.body

  try {
    const result = await LeaveManage.findOneAndUpdate({_id:ObjectId(userID)}, {$set:{submittedStatus:true, comments:data}})
    console.log(result)
    if(!result) return res.status(400).json({message: "Not updated"})

    res.status(200).json({status:true})

  } catch (error) {
    
  }
}
export const getLeaveRequest = async(req, res)=>{
  try {
      let result = await LeaveManage.find({submittedStatus:{$ne:true}})

      if(!result) return res.status(404).json({message:"Can't fullfill this Submission, Try Again"})

      res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
    cons
    res.status(200).json({message:"Something went wrong"})
    
  }
}

export const submitLeave = async (req, res)=>{
    let {leaveType, userID, employeeName, empID, fullname, fromDate, toDate, manager, projectAllocated, reason} = req.body;

    let {Project, proManager} = projectAllocated

    let requestedDate= new Date()
    const dateNow  = new Date();
    const month = dateNow.getMonth()+1;  
    const year = dateNow.getYear();

    let data={leaveType, month, year, requestedDate, userID, employeeName, empID, fullname, fromDate, toDate, manager, reason, projectName:Project, reason, manager: proManager}

  try {
    const result = await LeaveManage.create(data)
    const result2 = await Notification.findOne({user:ObjectId(userID)})
    // if(!result2) {
    //   console.log("here")
    //   await Notification.create({user:ObjectId(userID), notification:[{id:userID, fullname, read:false, message:"Leave Requested from ", type:"Leave"}  ] } )
    // }
    // else {
    //   console.log("here 2")
    //   await Notification.findOneAndUpdate({user:ObjectId(userID)}, {$push: {notification: {id:userID, fullname, read:false, message:"Leave Requested from ", type:"Leave"}}}) 
    // }
    if(!result) return res.status(404).json({message:"Can't fullfill this Submission, Try Again"})

    res.status(200).json({status:true})

  } catch (error) {

    console.log(error.message)

    res.status(200).json({message:"Something went wrong"})
  }
}

export const getHoliday = async (req, res)=> {
  let id = '61eb06cf6b7539f49aa3fc2f'
  try {
      const result= await Company.findOne({_id:ObjectId(id)})
      if(!result) return res.status(400).json({message:"No data"})
      res.status(200).json({holiday:result.holidays.length})
  } catch (error) {
      console.log(error.message)
      res.status(200).json(error.message)
  }
}

export const getEvents = async (req, res)=> {
  try {
    let events = await Events.find({isAnnouncements:{$eq:false}}).sort({_id:-1}).limit(1)
    if(!events) return res.status(404).json({message:"No Events found"})

    res.status(200).json(events[0])

  } catch (error) {
    res.status(404).json(error.message)
  }
}

export const timeOutStats = async(req, res)=>{
  const {id } = req.query;
  try {
    const date = dateToEpoch2(new Date)
    
    let user = await Employees.aggregate([
            {$match:  {userID:ObjectId(id)}}, 
            { $project:{timeSheet:1, _id:0}}
          ])
    let timesheetArray= user[0].timeSheet
    //if(!timesheetArray.length) return res.status(200).json({status:false}) ///no timesheet inserted
    const isExists = timesheetArray.find(element=> element.day===date)
    if(!isExists) return res.status(200).json({status:false})  // no current day existed
    if(isExists.title==="Pending") return res.status(200).json({status:true})
    if(isExists.title==="Submitted" || isExists.title==="Approved") return res.status(200).json({status:false}) 
    
  } catch (error) {
    res.status(500).json(error.message)

  }
}

export const timeInStats = async(req, res)=>{
  const {id } = req.query;
  try {
    const date = dateToEpoch2(new Date)
    
    let user = await Employees.aggregate([
            {$match:  {userID:ObjectId(id)}}, 
            { $project:{timeSheet:1, _id:0}}
          ])
    let timesheetArray= user[0].timeSheet

    const isExists = (element) => element.day  === date;
    let result = timesheetArray.some(isExists)
    res.status(200).json({status:result})


  } catch (error) {
    res.status(500).json({message: "Something went wrong"})

  }
}

export const  setTimeOut= async(req, res)=>{
  const {id } = req.body;

  const date = dateToEpoch2(new Date)

  try {

      const employeeData = await Employees.findOneAndUpdate({userID:ObjectId(id), 
      'timeSheet.day':date},{$set:{'timeSheet.$.title': "Submitted", 'timeSheet.$.end':new Date() }}  )
      // const employeeData = await Employees.findOne({userID:ObjectId(id)} )
      let timeSheetArray = employeeData.timeSheet
      let currentDay = timeSheetArray.find(ele=> ele.day===date )
      let hours = Math.abs(currentDay.start - currentDay.end) / 36e5;
      let dateNow  = new Date();
      let month = dateNow.getMonth()+1;  
      let year = dateNow.getYear();
      let updated= await Employees.findOneAndUpdate({userID:ObjectId(id), 'timeSheet.$.day':date},
                      {$set:{'timeSheet.$.hours': hours, month, year}})
      if(updated) return res.status(200).json({status:false}) 

      res.status(404).json({messsage:"no timesheet data found"})
  } catch (error) {

    res.status(500).json({message:error.message})
    console.log(error.message)
  }
}

export const  setTimeIn= async(req, res)=>{
  const {id } = req.body;
  const date = dateToEpoch2(new Date)
  try {
    let dateNow  = new Date();
    let month = dateNow.getMonth()+1;  
    let year = dateNow.getYear();
     let employeeData= await Employees.findOneAndUpdate({userID:id}, 
        {$push:{timeSheet:{
          start:new Date(), 
          day:date, 
          title:"Pending", 
          year,
          month,
          end:new Date(),
          hours:1
          }}
      })
      if(!employeeData) return res.status(404).json({message:"not submitted"})
      res.status(200).json({message:"Submitted successfuly"})


  } catch (error) {
    res.status(500).json({message:error.message})
    console.log(error.message)
  }
}

export const getTimeSheet =  (async(req, res)=>{
  const { id } = req.query
    try {
      const user =await Employees.findOne({userID:id})
      const events = await Events.find()
      const timeSheet =user._doc.timeSheet
      res.status(200).json([...events, ...timeSheet])
    } catch (error) {
      res.status(500).json(error.message)
    }
})

export const  fetchEmployeData= async(req, res)=>{
      const {id } = req.query;
      try {
          const employeeData = await Employees.findOne({userID:ObjectId(id)})
          if(!employeeData) return  res.status(400).json({message:"no data"})
          res.status(200).json(employeeData)

      } catch (error) {
        res.status(500).json({message:error.message})
        console.log(error.message)
      }
}

export const signin = async (req, res)=>{

        const {email, password} = req.body;

        try {
            if(!email || !password) return  res.status(404).json({ message: "Bad credentials"})

            const userExists = await User.findOne({email})

            if(!userExists) return  res.status(404).json({ message: "No User"})
         
            if(!userExists?._doc.AccessStatus) return  res.status(404).json({ message: "User blocked"})

            if(!userExists?._doc) return  res.status(404).json({ message: "User dosen't exists"})

            const isPassword = await bcrypt.compare(password, userExists.password)

            if(!isPassword) return  res.status(403).json({message: "Invalid credentials"})
   
            const token = jwt.sign({id: userExists?._id, email: userExists.email }, 'secret', {expiresIn: '1h'})

            let result = {...userExists._doc, password:null}

            res.status(200).json({result, token})

            // res.cookie('user', token, { httpOnly: true}).send()
            
        } catch (error) {
            res.status(500).json(error.message);
        }
}

export const createUser = async (req, res)=>{

        const { email, password, fullname } = req.body;
      
        try {
          const oldUser = await User.findOne({ email });
          console.log(oldUser)
          if (oldUser) return res.status(400).json({ message: "User already exists" });
      
          const hashedPassword = await bcrypt.hash(password, 12);
          const result = await User.create({ email, password: hashedPassword, fullname,});
          // await User.findOneAndUpdate({_id:result._id}, {isHR:true})
          const token = jwt.sign({id: result._id, email: result.email }, 'secret')

          const nameLowerCase = fullname.toLowerCase().replace(/\s/g, '')
          const organisationEmail= nameLowerCase+"@exampleCompany.com"

          let code = result._id.toString()
              code = code.substr(code.length - 5).toUpperCase();
          let empID = "EC"+code;

          await Employees.create({userID:result._id, fullname, email, organisationEmail, dateOfJoin:result.createdAt, empID})

            res.status(200).send()
        //   res.status(201).json({  message: "Sign In successfully"  });
        } catch (error) {
          res.status(500).json({ message: "Something went wrong" });
          
          console.log(error);
        }

}
export const logout = async(req, res)=>{

    res.cookie("user", "", { httpOnly: true, expires: new Date(0)}).send()

}

