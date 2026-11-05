
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [2, "Name must be at least 2 characters long"],
            maxlength: [40, "Name cannot exceed 40 characters"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, 'Password must be at least 6 characters long'],
            select: false,
        },
        // বিকাশ পেমেন্ট ও প্রিমিয়াম স্ট্যাটাসের জন্য ফিল্ডসমূহ
        isPremium: {
            type: Boolean,
            default: false
        },
        bkashSenderNumber: {
            type: String,
            default: ''
        },
        bkashTrxId: {
            type: String,
            default: ''
        },
        paymentStatus: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending'
        }
    }, {
    timestamps: true
});

userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare passwords
userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

// Remove password from json output
userSchema.methods.toJSON = function(){
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
}

const User = mongoose.model("User", userSchema);
export default User;
