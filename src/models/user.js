import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;
const STRING = mongoose.SchemaTypes.String;
const userObject = {
    name: {
        type: STRING,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 15,
        validate: {
            validator(v) {
                return v.length >= 2 && v.length <= 15;
            },
            message(props) {
                return `${props.value} length should between 2 and 15 characters`;
            }
        }
    },
    email: {
        type: STRING,
        required: true,
        unique: true,
        validate: {
            validator(v) {
                const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return v.match(emailformat);
            },
            message(props) {
                return `${props.value} is not valid email address`;
            }
        }
    },
    password: {
        type: STRING,
        minlength: 7,
        required: true
    },
    avatar: {
        type: STRING,
        required: false
    },
    DateAdded: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now
    }
};

const UserSchema = new Schema(userObject);

// cannot use arrow function in this cb
UserSchema.pre('save', async function(next) {
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
