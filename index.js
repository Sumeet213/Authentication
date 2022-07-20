const express = require("express");
// const env = require("./config/enviorment");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT;
 
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const flash = require("connect-flash");
const db = require("./config/mongoose");
const customMware = require("./config/middleware");
const path = require("path");
require("dotenv").config();
// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store the session cookie in the db
app.use(session({
  name: 'placement',
  // TODO change the secret before deployment in production mode
  secret: 'secret',
  saveUninitialized: false,
  resave: false,
  cookie: {
      maxAge: (1000 * 60 * 100)
  },
  store: MongoStore.create(
      {
          mongoUrl: 'mongodb://127.0.0.1/codeial_development',
          autoRemove: 'disabled'
      
      },
      function(err){
          console.log(err ||  'connect-mongodb setup ok');
      }
  )
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(customMware.setFlash);

app.use(passport.setAuthenticatedUser);
app.use(express.urlencoded());

// app.use(logger(env.morgan.mode, env.morgan.options));
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static("./assets"));

// use express router
app.use("/", require("./routes"));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.listen(process.env.PORT, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  // console.log("gidbuhsbvufdhbvuffbsevyue", process.env);
  console.log(`Server is running on port: ${process.env.PORT}`);
});
