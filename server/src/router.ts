import express from "express";

import boatActions from "./modules/boat/boatActions";
import gameActions from "./modules/game/gameActions";
import tileActions from "./modules/tile/tileActions";

const router = express.Router();

router.get("/api/boats", boatActions.browse);
router.get("/api/tiles", tileActions.browse);

router.post("/api/games", gameActions.add);

export default router;
