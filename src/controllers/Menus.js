import db from "../database";
import { add, modify, retire, get } from "../utils/MenuUtils";
class Menus {
    static async getMenu(req, res) {}

    static getMenus(req, res) {
        db.collection("menus")
            .find({})
            .toArray((err, result) => {
                if (err) return [];
                res
                    .json({
                        status: 200,
                        message: result
                    })
                    .status(200);
            });
    }

    static async insertMenu(req, res) {
        const { dest, name } = req.body;
        const dir = dest.split(":");
        const collection = db.collection("menus");
        const menus = await collection
            .find({})
            .toArray()
            .then(e => e)
            .catch(__err => {
                res
                    .json({
                        status: 404,
                        status: "Problem with the DB"
                    })
                    .status(404);
            });

        if (dir.length === 1 && dir[0] === "0") {
            collection.insertOne({
                    id: menus.length + 1,
                    name,
                    childrens: []
                },
                err => {
                    if (!err) {
                        res
                            .json({
                                status: 200,
                                status: "Exito"
                            })
                            .status(200);
                    }
                }
            );
        } else {
            const final = add(menus, dest, { name, childrens: [] });
            console.log(final[0].childrens);
            await collection.deleteMany({});
            await collection.insertMany(final);
            res
                .json({
                    status: 200,
                    message: "Item agregado exitosamente"
                })
                .status(200);
        }
    }

    static async borrarMenu(req, res) {}

    static async borrarMenus(req, res) {
        db.collection('menus').removeMany({}).then(e => {
            res.json({
                status: 200,
                message: "Items borrados..."
            }).status(200);
        })
    }
}

export default Menus;