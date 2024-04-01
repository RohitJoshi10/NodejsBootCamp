const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/Person");

passport.use(
  new LocalStrategy(async (USERNAME, password, done) => {
    // Authentication logic here
    try {
      // console.log("Received credentials", USERNAME, password);
      const user = await Person.findOne({ username: USERNAME }); // In person table we are findig that this username is in my table or not
      if (!user) {
        // user not found
        return done(null, false, { message: "Incorrect username." });
      }

      // When user is found now checking if it's password is correct for that username
      // It will compare both password one from the database and one from the what user has filled.
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password." });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
