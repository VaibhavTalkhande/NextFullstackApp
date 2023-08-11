import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
        username: {

                type: String,
                required: [true, 'Please enter a username'],
                unique: true,
                trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please enter a email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please enter a password'],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExpire: Date,
        verifyToken: String,
        verifyTokenExpire: Date,
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
