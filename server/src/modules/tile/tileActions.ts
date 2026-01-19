import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    // Fetch all tile from the database
    const tile = await tileRepository.readAll();

    // Respond with the tile in JSON format
    res.json(tile);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    const { coord_x, coord_y } = req.body;

    if (coord_x === undefined || coord_y === undefined) {
      res.sendStatus(422);
      return;
    }

    const tiles = await tileRepository.readByCoordinates(
      Number(coord_x),
      Number(coord_y),
    );

    if (tiles.length === 0) {
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
