import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    const tiles = await tileRepository.readAll();
    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    const coordX = req.body.coord_x;
    const coordY = req.body.coord_y;

    if (
      coordX === undefined ||
      coordY === undefined ||
      Number.isNaN(coordX) ||
      Number.isNaN(coordY)
    ) {
      res.sendStatus(422);
      return;
    }

    const tilesAtCoordinates = await tileRepository.readByCoordinates(
      coordX,
      coordY,
    );

    if (tilesAtCoordinates.length === 0) {
      res.sendStatus(422);
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
