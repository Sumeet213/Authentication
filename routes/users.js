const express = require("express");
const passport = require("passport");
const router = express.Router();

const usersController = require("../controllers/users_controller");

router.get("/profile", usersController.profile);
router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);
router.post("/create", usersController.create);
router.post("/create-session", usersController.createSession);
router.get("/sign-out", usersController.signOut);
router.get("/reset-password", usersController.resetPassword);
// router.get('/reset-password-page')
router.post("/user-reset-password", usersController.resetUserPassword);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  usersController.createSessionGoogle
);

module.exports = router;
