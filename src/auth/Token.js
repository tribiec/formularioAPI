import jwt from 'jsonwebtoken';

const createToken = (user, callback) => {
    jwt.sign(user, 'ionic_app_form', { expiresIn: '10m' }, callback);
}

const verifyToken = (token, callback) => {
    jwt.verify(token, 'ionic_app_form', callback);
}

export { createToken, verifyToken };