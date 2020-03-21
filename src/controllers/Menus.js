import database from "../database";
import Finder from "../utils/Finder";
import Modify from "../utils/Modify";

class Menus {
    static async getMenus(req, res) {
        const db = new database();
        const resp = await db.query({}, "menus").then(e => e);
        res.json({
            status: 200,
            message: [...resp]
        });
    }

    static async insertMenus(req, res) {
        const db = new database();
        const menus = await db.query({}, "menus").then(e => e);
        const id = Math.floor(Math.random() * (500 - 1 + 1) + 1);
        const { dest, name } = req.body;
        const model = { id, name, type: 1, childrens: [] };
        if (dest === 0) {
            db.insert(model, "menus").then((e, error) => {
                if (error) {
                    res.json({ status: 500, message: "Error al insertar Categoria" });
                } else {
                    res.json({ status: 200, message: [e] });
                }
            });
            console.log("Menu Insertado...", { id, name, type: 1, childrens: [] });
        } else {
            console.log(menus);
            const temp = Finder(menus, dest)[0];
            console.log("---------------------");
            console.log(temp);
            const response = Modify(menus, dest, {});
            console.log(response);
            // console.log(response);
            // db.drop('menus').then(e => {
            //     db.insert(response, 'menus').then(e => {
            //         if (e) {
            //             res.json({ status: 500, message: "Error al insertar menu" });
            //         } else {
            //             res.json({ status: 200, message: "Menu agregado con exito" });
            //         }
            //     });
            // });
        }
    }

    static async borrar() {
        const db = new database();
        db.drop("menus").then(e => {
            console.log("Borrado Menus...");
        });
        db.drop("forms").then(e => {
            console.log("Borrado Menus...");
        });
    }
}

export default Menus;