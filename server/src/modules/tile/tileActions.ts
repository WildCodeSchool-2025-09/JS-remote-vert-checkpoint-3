import type { RequestHandler } from "express";

import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();

    res.status(200).json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const coordX = Number(req.body.coord_x);
    const coordY = Number(req.body.coord_y);

    const tiles = await tileRepository.readByCoordinates(coordX, coordY);

    if (tiles.length > 0) {
      next();
      return;
    }

    res.sendStatus(422);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
