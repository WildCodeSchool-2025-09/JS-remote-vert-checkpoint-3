import type { RequestHandler } from "express";

import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all tiles from the database
    const tiles = await tileRepository.readAll();

    // Respond with the tiles in JSON format
    res.json(tiles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readByCoordinates(
      req.body.coord_x,
      req.body.coord_y,
    );

    if (!tiles.length) {
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
