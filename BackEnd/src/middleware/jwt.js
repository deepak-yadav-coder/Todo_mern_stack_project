const JWT = require('jsonwebtoken');
const { handleError } = require('../handle_response');

const generateToken = (data) => {
    const payload = {
        id: data.id,
        email: data.email,
        userName: data.userName
    }
    const token = JWT.sign(payload, process.env.SECRETE_TOKEN, {
        expiresIn: '15d'
    })
    return token
}

const verifyToken = (req, res, next) => {
    let token = req.cookies?.token;
    console.log('token ==', token)
    isValid = token ? JWT.verify(token, process.env.SECRETE_TOKEN) : '';
    isValid ? next() : handleError(res, 'invalid access token.', 400);

}
module.exports = { generateToken, verifyToken }