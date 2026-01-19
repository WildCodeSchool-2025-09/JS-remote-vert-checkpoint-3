import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const tiles = await tileRepository.readAll();

    // Respond with the boats in JSON format
    res.json(tiles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  const coordX = req.body.coord_x;
  const coordY = req.body.coord_y;

  const tile = await tileRepository.readByCoordinates(coordX, coordY);

  if (tile.length === 0) {
    res.sendStatus(422);
    return;
  }

  next();
};

export default {
  browse,
  validate,
};
