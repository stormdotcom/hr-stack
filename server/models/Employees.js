import mongoose from "mongoose"
const employeeSchema = mongoose.Schema({
userID:{type:mongoose.ObjectId, required:true},
selectedFile:{type:String},
filePublicID:{type:String},
empID:{type: String},
secondaryPhone:{type:String},
jobLocation:{type:String},
fullname: {type: String, required:true},
Designation:{
        name:String,
        isManager:{type:Boolean, default:false}
     },
contributions:{type:Array},
accomplishments:{type:Array},
organisationEmail:{type: String, required:true},
onBoard:{type: Boolean, required:true, default:false},
email:{type: String, required:true},

dateOfJoin:{type: Date,required: true},

projectAllocated:{
        Status: {type:Boolean, default:false},
        Project: {type:String},
        proManager:{type:String}
        },

skillSets:[{technology:{type:String, }}],

leaveBalance: {casual:{type:Number, required:true, default:3},sick:{type:Number, required:true, default:12}},

leaveDate:[{type:Object, }],

address:{ houseNo: String,
    houseName: String,
     zipCode: String,
     country:String,
     state:String,
      city:String,
      street:String,
      permanentAddress:Boolean
    },
    
address2:{ houseNo: String,
        houseName: String,
         zipCode: String,
         country:String,
         street:String,
         state:String,
          city:String,
        },
education:{ degree: String,
        passoutYear: String,
         board:String,
         Institute:String
         },

education2:{
         degree2: String,
        passoutYear2: String,
        board2:String, 
        Institute2:String                   
} ,                
contactInformation:{
        PrimaryPhone: String,
        SecondaryPhone: String,
        SecondaryEmail:String
        },

personalDetails:{
        fatherName: String,
        motherName: String,
      BloodGroup: String
        },

otherStatutoryInfo:{
    panNo: String,
    aadhaarNo: String,
    uanNo: String,
    pfNo: String,
    esiNo:String
},

bankDetails:{
  accountNumber:String,
  bank: String,
  ifscCode:String
},
emergencyContact: {
contactPerson:String,
phoneNumber:String,
place:String,
},
migration:{status:{type:Boolean, default:false},
    requestedDate:{type:Date},
    dateOfLeaving:{type:Date},
},
activeTickets:[{}],

myAssets:[{
}],

performanceRating:{type:Object, default:{}},

timeSheet:[{
        start: {type:Date},
        end: {type:Date},
        month:{type:Number},
        year:{type:Number},
        day: {type:Number},
        hours: {type:Number},
        title:{type:String}
}]
})
const Employees = mongoose.model('Employees', employeeSchema)
export default Employees;