import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import tileActions from "./modules/tile/tileActions";
import boatActions from "./modules/boat/boatActions";
import gameActions from "./modules/game/gameActions";

router.get("/api/boats", boatActions.browse);
router.put("/api/boats/:id", tileActions.validate, boatActions.edit);
router.post("/api/games", gameActions.add);
router.get("/api/tiles", tileActions.browse);

/* ************************************************************************* */

export default router;
