import mongoose from "mongoose"
const employeeSchema = mongoose.Schema({
userID:{type:mongoose.ObjectId, required:true},

empID:{type: String},

fullname: {type: String, required:true},

Designation:{
        typeOf:String,
        fulltime:Boolean,
        isManager:{type:Boolean, default:false}
     },

organisationEmail:{type: String, required:true},

email:{type: String, required:true},

dateOfJoin:{type: Date,required: true},

projectAllocated:{
        Status: {type:Boolean, default:false},
        Project: {type:String},
        proManager:{type:String, default:"John Wick"}
        },

skillSets:[{skill:{type:Object}}],

leaveBalance: {casual:{type:Number, required:true, default:3},sick:{type:Number, required:true, default:12}},

leaveDate:[{type:Object, }],

address:[{ houseNo: String,
    houseName: String,
     ZipCode: Number,
     Country:String,
     State:String,
      city:String,
      permanentAddress:Boolean
    } ],

contactInformation:{
        PrimaryPhone: String,
        SecondaryPhone: String
        },

personalDetails:{
        fatherName: String,
        motherName: String,
        SecondaryPhone: String,
      BloodGroup: String
        },

otherStatutoryInfo:{
    panNo: Number,
    aadhaarNo: Number,
    uanNo: Number,
    pfNo: Number,
    esiNo:Number
},

bankDetails:{
  accountNumber:Number,
  bankBranch: String,
   bank:String,
  ifscCode:String
},

migration:{status:{type:Boolean, default:true},
    requestedDate:Date,
    dateOfLeaving:Date,
},
activeTickets:[{}],

myAssets:[{
}],

performanceRating:{type:Object, default:{}},

timeSheet:[{
        start: {type:Date},
        end: {type:Date},
        day: {type:Number},
        hours: {type:Number},
        title:{type:String}
}]
})
const Employees = mongoose.model('Employees', employeeSchema)
export default Employees;