import { verifyToken } from '../auth/Token';
import LoginUser from '../auth/Login'

class User {
    static async checkLogin(req, res) {
        verifyToken(req.token, (err, authData) => {
            if (err) {
                res.status(401).json({
                    status: 401,
                    message: "Token Invalid"
                });
            } else {
                res.json({
                    message: authData,
                    status: 200
                }).status(200);
            }
        })
    }

    static async Login(req, res) {
        LoginUser({ correo: req.body.correo, clave: req.body.clave }, res);
    }

}

export default User;