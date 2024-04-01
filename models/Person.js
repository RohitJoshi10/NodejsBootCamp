const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the Person Schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

personSchema.pre("save", async function (next) {
  const person = this; // getting record from the DB in which we will perform hashing
  /*
      this hear only tell us that jab bhi hum DB mai save krne wale honge usse phele Pre middleware call hoga.
      wo sara data hum person mai store kr rhe h.
      We will also write a check condition here.
      Like if i am new person that my password will be hashed.
      But if am a existing user and just want to updating my salary.
      So, updating the salary is also a kind of save function and when it will save my salary
      before that my pre middleware will be called and it will hash my password in this case which was not 
      necessary as i already have a hashed password. So, to eliminate these kind of situation we will us a conditional statement.
  */

  // Hash the password only if it has been modified (or if it is  a new record)
  /*
    This person.modified function will check ki jo bhi documnet hum save krne jare hai.
    usme check kreega ki ispasswrod naam ka jo funciton hai wo humne modify kia h ya ni.
    Agr won ek new record hai so obvioulsy we are modifying the record. So, then person.isModified("password")
    funtion will return me true and as i have done negatin of it so it will make it false.

    Suppos, i have a existing user that is updating it's salary, so iss case mai hum salary change krre hai na ki passwrod.
    So, person.isModified("password") this function will give us false. After doing it's negatinon means true and then we will perform next()
    next()  ->> means i dont need hashing.

    if a user is in the database and we want to change it's password. so this function will return true and neagtion of it goes false.
    and then wo aage try k ander jayega.
  */

  if (!person.isModified("password")) return next();
  try {
    // hash passwrod generate.
    const salt = await bcrypt.genSalt(10);

    // hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);

    // override the plain password with the hashed one
    person.password = hashedPassword;

    // Next is a callback provided by mongoose which tells us that ki save krne se phle ka jo bhi kaam tha wo humne kr dia h.
    // now you can save it in the DB.
    next();
  } catch (error) {
    return next(error);
  }
});

// Define the compare password Method
personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // Use bcrypt to compare the provided password wth the hashed password.
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

// Create Person model
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
