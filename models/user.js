import mongoose from "mongoose";
import conn from "../db/conn.js"
import moment from "moment"

const currentDate = moment().format('YYYY/MM/DD, HH:mm:ss')

const Schema = mongoose.Schema

const Users = mongoose.model('Users', 
    new Schema({
        username: {type: String, required: true, unique: true, lowercase: true},
        email: {type: String, required: true, unique: true, lowercase: true},
        // password: {type: String, required: true, select: false},
        created: {type: String, default: currentDate}
    })
)

export default Users
