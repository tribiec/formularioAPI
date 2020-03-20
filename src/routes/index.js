import express from "express";
import Menus from "../controllers/Menus";
import Forms from "../controllers/Forms";
import SearchToken from "../middlewares/SearchToken";
import Users from "../controllers/Users";

const router = express.Router();

router.get("/menus", Menus.getMenus);
router.post("/menus", Menus.insertMenus);
router.get("/formulario/:id", Forms.getForm);
router.post("/formulario", Forms.insertForm);
router.post("/borrar", Menus.borrar);
router.post('/check', SearchToken, Users.checkLogin);
router.post('/login', Users.Login);

export default router;