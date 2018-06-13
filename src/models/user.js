import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const userObject = {
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 15
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        minlength: 7,
        required: true
    },
    avatar: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    DateAdded: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now
    }
};

const UserSchema = new Schema(userObject);

// cannot use arrow function in this cb
UserSchema.pre('save', async function (next) {
    let currentUser = this;
    if (currentUser.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            if (salt) {
                const hash = await bcrypt.hash(currentUser.password, salt);
                currentUser.password = hash;
                next();
            }
        } catch (err) {
            next();
        }
    } else {
        next();
    }
});

const user = mongoose.model('users', UserSchema);

export default user;
