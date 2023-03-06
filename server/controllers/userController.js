const User = require("../models/user");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const { tryCatch } = require("../utils/tryCatch");
const crypto = require("crypto");


// register page
exports.register = function(req, res) {
    res.render("register");
};


// registering new user
exports.newUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password
    });

   sendToken(user, res)

   res.redirect("/auth/login")

};


// user page
exports.user = function(req, res) {
    res.render("user");
};



// login page
exports.login =  function(req, res) {
    res.render("login", {});
};


// user login
exports.userLogin = tryCatch(async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
       throw new ErrorHandler("please enter your email and password", 400);
    }

    const user = await User.findOne({email}).select("+password");

    if(!user) {
        throw new ErrorHandler("invalid email or password", 401)
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        throw new ErrorHandler("invalid email or password", 400)
    }

    sendToken(user, res);


    res.redirect("/auth/user");


    


});


// forgot password page
exports.forgotPasswordPage = (req, res) => {
    res.render("forgotPassword");
};


// Forgot Password
exports.forgotPassword = async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("user not found", 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/auth/password/reset/${resetToken}/confirm`;

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try {

        await sendEmail({
            email: user.email,
            subject: "password recovery",
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }

};


// rest password page
exports.resetPasswordPage = (req, res) => {
    res.render("passwordReset");
}


//  reset password
exports.resetPassword = async (req, res, next) => {
    
    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler("Password reset token is invalid or has been expired", 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400))
    }

    // Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
};


// user logout
exports.userLogout = tryCatch(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });


    res.redirect("/auth/login");

});


