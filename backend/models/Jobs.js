import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    userId:{ //Refering to the user who applied to this job
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    company: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['product','service'],
    },
    role: {
        type: String,
    },
    status: {
        type: String,
        enum: ['applied', 'selected', 'rejected', 'interview']
    },
    appliedOn: {
        type: Date,
        default: Date.now,
    },
    remarks: {
        type: String,
    },
    interviewOn: {
        type: Date,
    },
    codingTestOn: {
        type: Date
    }

}, {timestamps: true});


const Job = mongoose.model('Job', JobSchema);

export default Job;