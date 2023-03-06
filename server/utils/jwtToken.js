// Create and send token, save it in the cookie.
const sendToken = (user, res) => {

    // Create Jwt token
    const token = user.getJwtToken();

    // Options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }


    res.cookie('token', token, options)
    

}

module.exports = sendToken;

