const InternModel = require('../models/internModel')
const CollegeModel = require('../models/collegeModel')

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

//function for request body validation
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}
const registerIntern = async function (req, res) {
    try {
        const requestBody = req.body

        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: "Invalid Parameters, Please send correct intern details" })
            return
        }

        const { name, email, mobile, collegeName } = requestBody  //destructuring of object

        //validation starts
        if (!isValid(name)) {
            res.status(400).send({ status: false, message: "Name is required" })
            return
        }
        if (!isValid(email)) {
            res.status(400).send({ status: false, message: "email is required" })
            return
        }
        //email validation using regular expression
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim()))) {
            res.status(400).send({ status: false, message: `Email should be a valid email address` })
            return
        }
        if (!isValid(mobile)) {
            res.status(400).send({ status: false, message: "mobile is required" })
            return
        }
        //mobile number validation
        if (!(/^\d{10}$/.test(mobile))) {
            res.status(400).send({ status: false, message: `mobile should be a valid` })
            return
        }
        if (!isValid(collegeName)) {
            res.status(400).send({ status: false, message: "collegeName is required" })
            return
        }
        //validation ends

        const isEmailAlreadyUsed = await InternModel.findOne({ email })
        if (isEmailAlreadyUsed) {
            res.status(400).send({ status: false, message: "Email is already used, try different one" })
            return
        }
        const isMobileAlreadyUsed = await InternModel.findOne({mobile})
        if (isMobileAlreadyUsed) {
            res.status(400).send({status:false, message :"Mobile is already used, try another one"})
            return
        }
        const collegeDetails = await CollegeModel.findOne({ name: collegeName })
        if (!collegeDetails) {
            res.status(404).send({ status: false, message: "No college exist with this name" })
            return
        }
        const collegeId = collegeDetails["_id"]
        const internDetails = { name, mobile, email, collegeId }

        const newIntern = await InternModel.create(internDetails)
        return res.status(201).send({ status: true, message: "Intern registered successfully", newIntern })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { registerIntern }