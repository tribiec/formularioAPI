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
        const { dest, name } = req.body;
        if (dest === 0) {
            db.insert({ id, name, type, childrens: [] }, 'menus');
        } else {
            const temp = Finder(menus, dest)[0];
            temp.childrens.push({ a: 1 });
            console.log(temp);
            Modify(menus, dest, { childrens: [...temp.childrens] });
            db.drop('menus').then(e => {
                db.insert(response, 'menus').then(e => {
                    console.log("exito al agregar menu");
                });
            });
        }
    }

    static async borrar() {
        const db = new database();
        db.drop('menus').then(e => {
            console.log("Borrado Menus...");
        });
        db.drop('forms').then(e => {
            console.log("Borrado Menus...");
        });
    }
}

export default Menus;