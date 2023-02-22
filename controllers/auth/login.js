const {
    user,
    Sequelize
} = require("../../models");

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
let self = {};
require('dotenv').config();

self.loginUser = async(request, response) => {
    const { email, password } = request.body
    let id
    let usrPass
    let usrPositionID
    let accessToken
    let refreshToken
    let userr
    let usrRole
    userr = await user.findOne({
            where: {
                email: email
            }
        })
        //console.log("The position user", userr)
    if (!userr) {
        return response.status(401).json({
            message: "Email address doesn't exit"
        })
    } else {
        usr = userr
        id = usr.id
        usrPass = usr.password
    }

    // ur = { id: usrRole.id, name: usrRole.name }
    // dep = { id: usrDepartment.id, name: usrDepartment.name }
    replyUser = {
            name: userr.name,
            email: userr.email,
        }
        //console.log("Authenticated user role is", usrDepartment.dataValues)

    bcrypt.compare(password, usrPass, function(err, result) {  
        if (result) { 
            usr = { id: id }
            accessToken = jwt.sign(usr,
                process.env.TOKEN_KEY, {
                    expiresIn: "2h",
                }
            );
            refreshToken = jwt.sign(usr, process.env.REFRESH_TOKEN_KEY, { expiresIn: "3h" })
                // save user token



            //console.log('success', result);
            response.cookie('accessToken', accessToken);
            response.cookie('refreshToken', refreshToken);
            return response.status(200).json({
                    userData: replyUser,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                })
                // return result;
        } else {
            return response.status(401).json({
                message: "The password is incorrect"
            })
        }
    })







}


module.exports = self;