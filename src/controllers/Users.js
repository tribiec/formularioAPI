import { verifyToken } from '../auth/Token';
import LoginUser from '../auth/Login'
import resolver from '../utils/resolvers';

class User {
    static async checkLogin(req, res) {
        verifyToken(req.token, (err, authData) => {
            if (err) {
                resolver(401, "Token Invalid", res);
            } else {
                resolver(200, authData, res);
            }
        })
    }

    static async Login(req, res) {
        LoginUser({ correo: req.body.correo, clave: req.body.clave }, res);
    }

}

export default User;