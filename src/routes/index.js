import express from "express";
import Menus from "../controllers/Menus";
import Forms from "../controllers/Forms";
import SearchToken from "../middlewares/SearchToken";
import Users from "../controllers/Users";

const router = express.Router();

router.get("/menus", Menus.getMenus);
router.get("/forms", Forms.getForms);
router.get("/forms/:id", Forms.getForm);
router.post("/menus", Menus.insertMenu);
router.post("/forms", Forms.insertForm);
router.post("/install", Menus.insertModel);
router.post("/borrar", Menus.deleteMenus);
router.post("/check");
router.post("/login");
router.delete("/forms", Forms.deleteForm);
router.delete("/menus", Menus.deleteMenu);

export default router;