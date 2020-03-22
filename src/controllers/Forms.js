import db from "../database";
import resolver from "../utils/resolvers";
import Menus from './Menus';

class Forms {
    static async getForm(req, res) {
        const collection = db.collection('forms');
        const id = req.body.id;
        const form = await collection.find({ id }).toArray().then(e => e).catch(e => []);
        if (form.length > 0) {
            resolver(200, [...form], res);
        } else {
            resolver(404, "Formulario no encontrado", res);
        }
    }

    static async getForms(req, res) {
        const collection = db.collection('forms');
        const forms = await collection.find({}).toArray().then(e => e).catch(e => []);
        resolver(200, [...forms], res);
    }

    static async insertForm(req, res) {
        const collection = db.collection('forms');
        const { name, fields, dest } = req.body;
        const cuenta = await collection.find({}).toArray().then(e => e).catch(e => []);
        req.form_id = cuenta + 1;
        await collection.insertOne({ name, fields, id: (cuenta.length + 1) }).then();
        Menus.insertMenu(req, res);
    }
}

export default Forms;