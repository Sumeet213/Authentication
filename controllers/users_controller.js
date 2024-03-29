const User = require("../models/user");
const crypto = require("crypto");
module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
  return res.render("user_profile", {
    title: "User Profile",
    // user: user,
  });
  }else {
    console.log("entered Headers");
    return res.redirect("/users/sign-in");
  }
};

// sign up page
module.exports.signUp = function (req, res) {
  if (!req.cookies.user_id) {
    return res.render("user_sign_up", {
      title: "Authentication | Sign Up",
    });
  } else {
    return res.redirect("/users/profile");
  }
};

// sign in page
module.exports.signIn = function (req, res) {
  if (!req.cookies.user_id) {
    return res.render("user_sign_in", {
      title: "Authentication | Sign In",
    });
  } else {
    return res.redirect("/users/profile");
  }
};

// Sign up data
module.exports.create = function (req, res) {
  // later for sign up
  if (req.body.password != req.body.confirm_password) {
    req.flash("success", "Password and Confirm Password are not same");
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user in signing up");
      return;
    }
    if (!user) {
      // const secret = 'abcdefg';

      User.create(
        {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
        function (err, user) {
          if (err) {
            console.log("Error in finding user in signing up");
            return;
          }
          req.flash("success", "Signed Up Successfully");
          return res.redirect("/users/sign-in");
        }
      );
    } else {
      req.flash("error", "Sign Up Failed");
      return res.redirect("back");
    }
  });
};

// sign in data
module.exports.createSession = function (req, res) {
  // find the user
  User.findOne({ email: req.body.email }, function (err, user) {
    //
    if (err) {
      console.log("Error in finding user in signing in");
      return;
    }
    // handle user found
    if (user) {
      // handle unmatched password
      if (user.password != req.body.password) {
        // user.validPassword(req.body.password)
        req.flash("error", "Wrong username or password");
        return res.redirect("back");
      }
      // handle session create
      res.cookie("user_id", user.id);
      req.flash("success", "Logged in successfully");
      return res.redirect("/users/profile");
    } else {
      // handle user not found
      req.flash("error", "Wrong username or password");
      console.log("Not signed in");
      return res.redirect("back");
    }
  });
};

module.exports.createSessionGoogle = function (req, res) {
 res.cookie("user_id", "544654654654848484866");
  req.flash("success", "Logged in Successfully");
  return res.redirect("/users/profile");
};

// Sign out
module.exports.signOut = function (req, res) {
  res.clearCookie("user_id");
  // res.clearCookie(user_id);
  req.flash("success", "Signed Out Successfully");
  return res.redirect("/users/sign-in");
};

// render reset password page
module.exports.resetPassword = function (req, res) {
  if (req.cookies.user_id){
  return res.render("user_reset_password", {
    title: "Authentication | Reset Password",
  });
}
else{
  return res.redirect("/users/sign-in");
}
};

// reset password
// module.exports.resetUserPassword = function (req, res) {
//   // password and confirm_password are not same
//   console.log(req.body);
//   if (req.body.password != req.body.confirm_password) {
//     req.flash("error", "Password and Confirm Password are not same");
//     // console.log("password and confirm_password are not same");
//     return res.redirect("back");
//   }
//   // find user
//   let user = await User.findOne({ email: req.body.email }, function (err, user) {
//     if (err) {
//       req.flash("error", "User not found");
//       console.log("Unable to find the said email");
//       return res.redirect("back");
//     }
//     // user found

//     if (user) {
//       User.updateOne(
//         { email: req.body.email },
//         {
//          password: req.body.password,
          
//         }
        
//       );
//       console.log(req.body.password);
//       // user.password = req.body.password;
//       user.save();
//       req.flash("success", "Password Changed Successfully");
//       console.log("password changed");
//       return res.redirect("/users/profile");
//     } else {
//       // user not found
//       req.flash("error", "User not found");
//       console.log("password not changed as user could not be found");
//       return res.redirect("back");
//     }
//   });
// };

module.exports.resetUserPassword =async function (req, res) {
 try {
   if (req.body.password != req.body.confirm_password) {
    req.flash("error", "Password and Confirm Password are not same");
    // console.log("password and confirm_password are not same");
    return res.redirect("back");
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    await User.updateOne(
      { email: req.body.email },
      {
       password: req.body.password,
        
      }
      
    );
    console.log(req.body.password);
    // user.password = req.body.password;
    user.save();
    req.flash("success", "Password Changed Successfully");
    console.log("password changed");
    return res.redirect("/users/profile");
  }
 

 }

 catch(err){
  req.flash("error", "User not found");
  console.log("password not changed as user could not be found");
  return res.redirect("back");

 }
};






