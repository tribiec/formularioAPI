import database from "../database";
import Finder from "../utils/Finder";
class Forms {
    static async getForm(req, res) {
        const db = new database();
        const menus = await db.query({ id: req.params.id }, "forms").then(e => e);
        res.json({
            status: 200,
            message: [...resp]
        });
    }

    static async insertForm(req, res) {
        const db = new database();
        const menus = await db.query({}, "menus").then(e => e); //? Obtenemos todos los Menus
        const id = Math.random() * (150 - 50) + 50;
        const { name, fields, dest } = req.body;
        const setValue = { id, name, fields };
        db.insert(setValue, "forms"); //? Insertar en Coleccion de Forms
        const categoria = Finder(menus, dest)[0]; //? Buscar ese Campo en Menus para agregar nuevo hijo (Form)
        categoria.childrens.push({...setValue, type: 2 });
        const final = Modify(menus, dest, { childrens: [...categoria.childrens] });
        db.drop("menus").then(e => {
            db.insert(final, "menus").then(e => {
                console.log("exito al gregar form");
            });
        });
    }
}

export default Forms;