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
  // your code here
};

export default {
  browse,
  validate,
};
