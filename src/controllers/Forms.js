import database from "../database";
import Finder from "../utils/Finder";
import Modify from "../utils/Modify";
class Forms {
    static async getForm(req, res) {
        const db = new database();
        const menus = await db.query({ id: req.params.id }, "forms").then(e => e);
        console.log(menus);
        res.json({
            status: 200,
            message: [...menus]
        });
    }

    static async insertForm(req, res) {
        const db = new database();
        const menus = await db.query({}, "menus").then(e => e); //? Obtenemos todos los Menus
        const id = Math.floor(Math.random() * (500 - 1 + 1) + 1);
        const { name, fields, dest } = req.body;
        const setValue = { id, name, fields, completed: 0 };
        db.insert(setValue, "forms"); //? Insertar en Coleccion de Forms
        if (dest === 0) {
            db.insert({ id, name, type: 2 }, "menus").then((e, error) => {
                if (error) {
                    res.json({ status: 500, message: "Error al insertar Form" });
                } else {
                    res.json({ status: 200, message: [{...e }] });
                }
            });
        } else {
            const categoria = Finder(menus, dest)[0]; //? Buscar ese Campo en Menus para agregar nuevo hijo (Form)
            console.log(menus);
            // categoria.childrens.push({...setValue, type: 2 });
            // const final = Modify(menus, dest, {
            //     childrens: [...categoria.childrens]
            // });
            // db.drop("menus").then(e => {
            //     if (e) {
            //         db.insert(final, "menus").then((e, error) => {
            //             if (error) {
            //                 res.json({ status: 500, message: "Error al insertar Form" });
            //             } else {
            //                 res.json({ status: 200, message: [e] });
            //             }
            //         });
            //     } else {
            //         console.log("Error ha ocurrido");
            //     }
            // });
        }
    }
}

export default Forms;