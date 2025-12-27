const bcrypt = require('bcrypt');
const { handleSuccess, handleError } = require('../handle_response');
const modelSignup = require('../../model/user_model');
const { generateToken } = require('../middleware/jwt');

const signup = async (req, res) => {
    try {
        let reqData = req.body;
        let { name, email, password } = reqData;
        if (!name || !email || !password) {
            handleError(res, '', 400, 'all fields are required');
        } else {

            password = password && await bcrypt.hash(password, 10);
            validateData = new modelSignup({
                userName: name, email, password
            })
            let is_exist = await modelSignup.findOne({ email })
            if (is_exist) {
                handleError(res, '', 400, 'email already exist.');
            } else {
                let { userName, email } = await validateData.save();
                handleSuccess(res, { userName, email }, 200, 'singup successfully.')
            }
        }
    } catch (error) {
        console.log(error);
        handleError(res, '', 400, 'something went wrong during singup.')
    }
}

const login = async (req, res) => {
    let reqData = req.body;
    try {
        let { email, password } = reqData;
        if (!email || !password) {
            return handleError(res, 'all fields are required', 400)
        } else {
            let getUserData = await modelSignup.findOne({ email }).select('+password');
            isValidPass = getUserData && await bcrypt.compare(password, getUserData.password)

            if (getUserData && isValidPass) {
                let token = generateToken({ email, userName: getUserData.userName, id: (getUserData._id).toString() });
                res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: 'strict'
                });

                handleSuccess(res, { email, token }, 202, 'login successfully.');
            } else {
                return handleError(res, '', 400, getUserData ? 'password is not valid.' : 'user not exist.')
            }
        }
    } catch (error) {
        console.log(error)
        return handleError(res, error, 400, 'something went wrong during login.')
    }
}

module.exports = {
    signup,
    login
}