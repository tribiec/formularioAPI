import express from "express";
import Menus from "../controllers/Menus";
import Forms from "../controllers/Forms";
import SearchToken from "../middlewares/SearchToken";
import Users from "../controllers/Users";

const router = express.Router();

router.get("/menus", Menus.getMenus);
router.post("/menus", Menus.insertMenu);
router.get("/formulario/:id");
router.post("/formulario");
router.post("/borrar");
router.post("/check");
router.post("/login");

export default router;