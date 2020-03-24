import { createToken } from './Token';
import Resolver from '../utils/resolvers';
import resolver from '../utils/resolvers';
const loginUser = async({ correo, clave }, res) => {

    let query = (correo === "test@test.com") ? [{
        clave: 1234,
        correo: "test@test.com",
        bio: "Estudiante de URU",
        fullName: "Carlos Tribiec"
    }] : "";
    if (query.length === 0) {
        //! Usuario no existe
        resolver(401, "Usuario no existe...", res);
    } else {
        query = query[0]
            //* Acceso Correcto
        if (query.clave == clave) {
            delete query.clave, delete query.super_user;
            createToken(query, (err, token) => {
                query.token = token
                resolver(200, query, res);
            });
        } else {
            //! Clave errada...
            resolver(401, "Clave incorrecta", res);
        }
    }

}

export default loginUser;