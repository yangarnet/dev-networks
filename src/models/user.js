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
UserSchema.pre('save', function (next) {
  let currentUser = this;
  if (currentUser.isModified('password')) {
    // gen salt
    bcrypt.genSalt(10, (err, salt) => {
      // hashing pwd with the salt
      bcrypt.hash(currentUser.password, salt, (err, hash) => {
        if (err) {
          throw err;
        }
        // update password with hash result
        currentUser.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const user = mongoose.model('users', UserSchema);

export default user;
