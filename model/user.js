const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Name is Required'],
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    job_role: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
        trim: true,
    },
    deletedflag: {
        type: Number,
        default: 0
    }
}, {timestamps: true, toJSON: {virtuals: true, transform: docTransform}, toObject: {virtuals: true, transform: docTransform}})

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return (next)

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    
    next()
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

function docTransform(doc, ret){
    delete ret.password
    delete ret.__v

    return ret
}

module.exports = mongoose.model('Users', userSchema)