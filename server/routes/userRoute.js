const express = require("express");
const { newUser, userLogin, userLogout, forgotPassword, resetPassword, login, register, user, forgotPasswordPage, resetPasswordPage } = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = express.Router();



router.route("/register").post(newUser).get(register);
router.route("/login").post(userLogin).get(login);
router.route("/logout").get(userLogout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token/confirm").put(resetPassword);
router.route("/user").get(isAuthenticatedUser, user);
router.route("/forgot-password").get(forgotPasswordPage);
router.route("/password/reset/:token/confirm").get(resetPasswordPage);



module.exports = router;
