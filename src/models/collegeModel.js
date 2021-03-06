const mongoose = require('mongoose')

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
        trim: true,
        unique: true,
       lowercase:true
    },
    fullName: {
        type: String,
        required: 'Full name is required',
        trim: true
    },
    logoLink: {
        type: String,
        required: 'Logo link is required',
        trim: true,
        lowercase : true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })
 
module.exports = mongoose.model('College', collegeSchema)

