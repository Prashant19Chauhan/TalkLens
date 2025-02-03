import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
    hostName:{
        type:String,
        required:true,
    },
    meetingName:{
        type:String,
        required:true,
    },
    ownerId:{
        type:String,
        required:true,
    },
    participants:{
        type:[String],
    }
})

const meeting = mongoose.model('Meeting', meetingSchema);
export default meeting;