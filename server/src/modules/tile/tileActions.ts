import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    const tile = await tileRepository.readAll();

    res.json(tile);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const tile = {
      id: Number(req.params.id),
      coord_x: req.body.coord_x,
      coord_y: req.body.coord_y,
      type: req.body.type,
      has_treasure: req.body.has_treasure,
    };

    const updatedTile = await tileRepository.update(tile);
    if (updatedTile === 0) {
      res.status(404).send("Tile not found");
    } else {
      res.status(204).send("Tile updated successfully");
    }
  } catch (err) {
    next(err);
  }
};
const validate: RequestHandler = async (req, res, next) => {
  try {
    const coord_x = Number(req.body.coord_x);
    const coord_y = Number(req.body.coord_y);

    if (Number.isNaN(coord_x) || Number.isNaN(coord_y)) {
      res.sendStatus(422);
      return;
    }

    if (coord_x < 0 || coord_x > 11 || coord_y < 0 || coord_y > 5) {
      res.sendStatus(422);
      return;
    }

    const tile = await tileRepository.readByCoordinates(coord_x, coord_y);

    if (!tile) {
      res.sendStatus(404);
      return;
    }
  } catch (err) {
    next(err);
  }
  next();
};

export default {
  browse,
  validate,
};
