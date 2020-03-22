import db from "../database";
import { add, modify, retire, get } from "../utils/MenuUtils";
import resolver from "../utils/resolvers";
class Menus {
    static async getMenu(req, res) {}

    static getMenus(req, res) {
        db.collection("menus")
            .find({})
            .toArray((err, result) => {
                if (err) return [];
                resolver(200, result, res);
            });
    }

    static async insertMenu(req, res) {
        const { dest, name } = req.body;
        const form_id = (req.form_id) ? req.form_id : req.body.form_id;
        const customChildrens = form_id ? { form_id } : { childrens: [] };
        const dir = dest.split(":");
        const collection = db.collection("menus");
        const menus = await collection
            .find({})
            .toArray()
            .then(e => e)
            .catch(__err => {
                resolver(100, "Problem with the DB", res);
            });

        if (dir.length === 1 && dir[0] === "0") {
            collection.insertOne({
                    id: menus.length + 1,
                    name,
                    ...customChildrens
                },
                err => {
                    if (!err) {
                        resolver(200, "Item agregado con exito", res);
                    }
                }
            );
        } else {
            const final = add(menus, dest, { name, ...customChildrens });
            await collection.deleteMany({});
            await collection.insertMany(final);
            resolver(200, "Item agregado con exito", res);
        }
    }

    static async borrarMenu(req, res) {}

    static async borrarMenus(req, res) {
        db.collection("menus")
            .removeMany({})
            .then(e => {
                db.collection("forms")
                    .removeMany({})
                    .then(e => {
                        resolver(200, "Items borrados...", res);
                    });
            });
    }
}

export default Menus;