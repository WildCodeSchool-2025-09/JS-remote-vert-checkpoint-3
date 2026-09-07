import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const tiles = await tileRepository.readAll();

    // Respond with the tiles in JSON format
    res.json(tiles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  const coord_x = req.body.coord_x;
  const coord_y = req.body.coord_y;

  if (coord_x >= 0 && coord_x <= 11 && coord_y >= 0 && coord_y <= 5) {
    return next();
  }

  res.sendStatus(422);
};

export default {
  browse,
  validate,
};
