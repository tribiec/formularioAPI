import db from "../database";
import { add, getRetiredForms, retire } from "../utils/MenuUtils";
import Forms from "./Forms";
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
        const form_id = req.form_id ? req.form_id : req.body.form_id;
        const customChildrens = form_id ? { form_id } : { childrens: [] };
        const collection = db.collection("menus");
        const menus = await collection
            .find({})
            .toArray()
            .then(e => e)
            .catch(__err => {
                resolver(500, "Problem with the DB", res);
            });
        if (menus.length === 0 && dest != 0) {
            resolver(400, "Bad Request", res);
        } else {
            const final = add(menus, dest, { name, ...customChildrens });
            if (!Array.isArray(final)) {
                resolver(final.code, final.message, res);
            } else {
                await collection.deleteMany({});
                await collection.insertMany(final);
                resolver(201, "Item agregado con exito", res);
            }
        }
    }

    static async deleteMenu(req, res) {
        const dest = req.body.dest;
        const mCollection = db.collection("menus");
        const fCollection = db.collection("forms");
        const menus = await mCollection
            .find({})
            .toArray()
            .then(e => e)
            .catch(err => {
                console.log("Error en deleteMenu obteniendo gets");
                return [];
            });
        const forms = await fCollection
            .find({})
            .toArray()
            .then(e => e)
            .catch(err => {
                console.log("Error en deleteMenu obteniendo forms");
                return [];
            });
        const forms_to_retire = getRetiredForms(menus, dest);
        const menus_modified = retire(menus, dest);
        const forms_modified = forms.filter(
            form => !forms_to_retire.includes(form.id)
        );
        const forms_excluded = forms.filter(form =>
            forms_to_retire.includes(form.id)
        );
        if (Array.isArray(forms_to_retire) && Array.isArray(menus_modified)) {
            if (forms_to_retire.length > 0) await fCollection.deleteMany({});
            if (forms_modified.length > 0)
                await fCollection.insertMany(forms_modified);
            await mCollection.deleteMany({});
            await mCollection.insertMany(menus_modified);
            resolver(
                200, { m: "Menu y formularios eliminados con exito", forms: forms_excluded },
                res
            );
        } else {
            resolver(menus_modified.status, menus_modified.message, res);
        }
    }

    static async deleteMenus(req, res) {
        db.collection("menus")
            .removeMany({})
            .then(e => {
                db.collection("forms")
                    .removeMany({})
                    .then(e => {
                        resolver(202, "Items borrados...", res);
                    });
            });
    }

    static async insertModel(req, res) {
        const collections = {
            m: db.collection("menus"),
            f: db.collection("forms")
        };
        const menus = [{
                id: 1,
                name: "Formularios",
                childrens: [{
                        id: "1:1",
                        name: "Form 1",
                        form_id: 1
                    },
                    {
                        id: "1:2",
                        name: "Form 2",
                        form_id: 2
                    }
                ]
            },
            {
                id: 2,
                name: "Platos de Comida",
                childrens: [{
                    id: "2:1",
                    name: "Italiana",
                    childrens: [{
                            id: "2:1:1",
                            name: "Pizzas",
                            childrens: [{
                                id: "2:1:1:1",
                                name: "Napolitana",
                                form_id: 3
                            }]
                        },
                        {
                            id: "2:1:2",
                            name: "Pastas",
                            childrens: [{
                                id: "2:1:2:1",
                                name: "Bolognesa",
                                form_id: 4
                            }]
                        }
                    ]
                }]
            },
            {
                id: 3,
                name: "Menu 3",
                childrens: [{
                    id: "3:1",
                    name: "Menu 3.1",
                    childrens: [{
                            id: "3:1:1",
                            name: "Form 5",
                            form_id: 5
                        },
                        {
                            id: "3:1:2",
                            name: "Menu 3.1.2",
                            childrens: [{
                                    id: "3:1:2:1",
                                    name: "Form 6",
                                    form_id: 6
                                },
                                {
                                    id: "3:1:2:2",
                                    name: "Form 7",
                                    form_id: 7
                                }
                            ]
                        }
                    ]
                }]
            }
        ];
        const forms = [{
                id: 1,
                name: "Form 1",
                fields: [1, 2, 3]
            },
            {
                id: 2,
                name: "Form 2",
                fields: [1, 2, 3]
            },
            {
                id: 3,
                name: "Form 3",
                fields: [1, 2, 3]
            },
            {
                id: 4,
                name: "Form 4",
                fields: [1, 2, 3]
            },
            {
                id: 5,
                name: "Form 5",
                fields: [1, 2, 3]
            },
            {
                id: 6,
                name: "Form 6",
                fields: [1, 2, 3]
            },
            {
                id: 7,
                name: "Form 7",
                fields: [1, 2, 3]
            }
        ];
        try {
            await collections.m.deleteMany({});
            await collections.f.deleteMany({});
            await collections.m.insertMany(menus);
            await collections.f.insertMany(forms);
            resolver(200, "Modelo insertado con exito...", res);
        } catch (exc) {
            const msg = "Error al insertar Modelo...";
            console.log(msg);
            resolver(500, msg, res);
        }
    }
}

export default Menus;