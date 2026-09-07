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
  try {
    const { coord_x, coord_y } = req.body;

    const tiles = await tileRepository.readByCoordinates(coord_x, coord_y);

    if (tiles.length > 0) {
      next();
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
