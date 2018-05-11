import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const user = {
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
    minlength: 2
  },
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true
  },
  avatar: {
    type: mongoose.SchemaTypes.String,
    required: true
  },
  DateAdded: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now
  }
};

const UserSchema = new Schema(user);

// cannot use arrow function in this cb
UserSchema.pre("save", function(next) {
  let user = this;
  if (user.isModified("password")) {
    // gen salt
    bcrypt.genSalt(10, (err, salt) => {
      // hashing pwd with the salt
      bcrypt.hash(user.password, salt, (err, hash) => {
        // update password with hash result
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
