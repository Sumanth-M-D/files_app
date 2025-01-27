import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import { populate } from "dotenv";

// Get the number of salt rounds for bcrypt hashing from environment variables
const { SALT_ROUNDS } = process.env;

// Define the schema for the User model
const userSchema = mongoose.Schema({
  fName: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "First name is required"],
  },

  lName: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "First name is required"],
  },

  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, "A user must have an email."],
    validate: [validator.isEmail, "Please provide a valid email."],
  },
  phone: {
    type: Number,
    required: [true, "Phone number is required"],
    min: [1000000000, "Enter a valid phone number"],
    max: [9999999999, "Enter a valid phone number"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: [8, "Password must be minimum 8 characters long"],
    maxLength: [15, "Password must be maximum of 15 characters long"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm the password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
    select: false,
  },

  rootFolder: {
    type: mongoose.Schema.ObjectId,
    ref: "Folder",
  },

  // Other details
  bio: {
    type: String,
    maxLength: [300, "Only 300 charecters allowed for bio"],
    default: "",
  },

  addressLine_1: {
    type: String,
    maxLength: [300, "Only 300 charecters allowed "],
    default: "",
  },

  addressLine_2: {
    type: String,
    maxLength: [300, "Only 300 charecters allowed "],
    default: "",
  },

  city: {
    type: String,
    maxLength: [300, "Only 300 charecters allowed "],
    default: "",
  },

  state: {
    type: String,
    maxLength: [300, "Only 300 charecters allowed "],
    default: "",
  },

  country: {
    type: String,
    maxLength: [300, "Only 300 charecters allowed "],
    default: "",
  },

  zipCode: {
    type: Number,
    default: "",
  },

  photo: {
    type: String,
    default: "", //TODO: from firebase
  },

  coverPhoto: {
    type: String,
    default: "",
  },

  facebook: {
    type: String,
    maxLength: [300, "Only 600 charecters allowed "],
    default: "",
  },
  twitterX: {
    type: String,
    maxLength: [300, "Only 600 charecters allowed "],
    default: "",
  },
  instagram: {
    type: String,
    maxLength: [300, "Only 600 charecters allowed "],
    default: "",
  },
});

// Pre-save middleware to hash the password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, Number(SALT_ROUNDS));
  this.passwordConfirm = undefined;
  next();
});

// userSchema.pre(/^find/, async function (next) {
//   this.populate({ path: "rootFolder" });
//   next();
// });

// Instance method to check if the provided password matches the stored password
userSchema.methods.checkPassword = async function (
  inputPassword,
  actualPassword
) {
  return await bcrypt.compare(inputPassword, actualPassword);
};

// Create and export the User model using the userSchema
const User = mongoose.model("User", userSchema);
export default User;
