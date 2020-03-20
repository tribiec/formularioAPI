import database from "../database";
import Finder from "../utils/Finder";
class Forms {

    static async getForm(req, res) {
        const db = new database();
        const menus = await db.query({ id: req.params.id }, 'forms').then(e => e);
        res.json({
            status: 200,
            message: [...resp]
        });
    }

    static async insertForm(req, res) {
        const db = new database();
        const id = ((Math.random() * (150 - 50)) + 50);
        const menus = await db.query({}, 'menus').then(e => e);
        const { name, fields, label, minLength, maxLength, type, dest } = req.body;
        const setValue = {...req.body.childrens, id, name, fields, label, minLength, maxLength, type };
        db.insert(setValue, 'forms');
        const categoria = Finder(menus, dest)[0];
        categoria.childrens.push(setValue);
        const final = Modify(menus, dest, { childrens: [...categoria.childrens] });
        db.drop('menus').then(e => {
            db.insert(final, 'menus').then(e => {
                console.log("exito al gregar form");
            });
        });
    }

}

export default Forms;