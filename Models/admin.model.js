import mongoose from 'mongoose'

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: [true, , "email must be unique"]
    },
    password: {
        type: String,
        require: [true, "password Can't be blank"],
    },
    profilePic: {
        type: String,
        require: true
    }
},
    { timestamps: true }
)

export const adminModel = mongoose.model("admin", AdminSchema);