import type { RequestHandler } from "express";

import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();

    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  const coordX = Number(req.body.coord_x);
  const coordY = Number(req.body.coord_y);

  const tiles = await tileRepository.readByCoordinates(coordX, coordY);

  if (tiles != null && tiles.length > 0) {
    next();
  } else {
    res.sendStatus(422);
  }
};

export default {
  browse,
  validate,
};
