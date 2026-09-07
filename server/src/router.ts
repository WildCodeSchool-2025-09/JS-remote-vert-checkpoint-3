import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import boatActions from "./modules/boat/boatActions";
import tileActions from "./modules/tile/tileActions";

router.get("/api/boats", boatActions.browse);

router.put("/api/boats/:id", boatActions.edit);

router.get("/api/tiles", tileActions.browse);

import gameActions from "./modules/game/gameActions";

router.post("/api/games", gameActions.add);

/* ************************************************************************* */

export default router;
