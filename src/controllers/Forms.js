import db from "../database";
import resolver from "../utils/resolvers";
import Menus from "./Menus";
import { retire } from "../utils/MenuUtils";

class Forms {
    static async getForm(req, res) {
        const collection = db.collection("forms");
        const id = req.body.id;
        const form = await collection
            .find({ id })
            .toArray()
            .then(e => e)
            .catch(e => []);
        if (form.length > 0) {
            resolver(200, [...form], res);
        } else {
            resolver(404, "Formulario no encontrado", res);
        }
    }

    static async getForms(req, res) {
        const collection = db.collection("forms");
        const forms = await collection
            .find({})
            .toArray()
            .then(e => e)
            .catch(e => []);
        resolver(200, [...forms], res);
    }

    static async insertForm(req, res) {
        const collection = db.collection("forms");
        const { name, fields } = req.body;
        const cuenta = await collection
            .find({})
            .toArray()
            .then(e => e)
            .catch(e => []);
        req.form_id = cuenta.length > 0 ? cuenta[cuenta.length - 1].id + 1 : 1;
        await collection
            .insertOne({ name, fields: fields || [], id: cuenta.length + 1 })
            .then();
        Menus.insertMenu(req, res);
    }

    static async deleteForm(req, res) {
        const dest = req.body.dest;
        const mCollection = db.collection("menus");
        const fCollection = db.collection("forms");
        try {
            const menus = await mCollection
                .find({})
                .toArray()
                .then(e => e);
            const forms = await fCollection
                .find({})
                .toArray()
                .then(e => e);
            const menus_modified = retire(menus, dest, true);
            const forms_modified = forms.filter(form => form.id != menus_modified.id);
            await mCollection.deleteMany({});
            await mCollection.insertMany(menus_modified.data);
            await fCollection.deleteMany({});
            await fCollection.insertMany(forms_modified);
            resolver(200, "Form retirado con exito...", res);
        } catch (exc) {
            const msg = "Programa finalizado con error...";
            console.log(msg);
            resolver(500, msg, res);
        }
    }
}

export default Forms;