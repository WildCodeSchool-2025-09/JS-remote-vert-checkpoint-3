import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const boats = await tileRepository.readAll();

    // Respond with the boats in JSON format
    res.json(boats);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const tile = await tileRepository.readByCoordinates(
      req.body.coord_x,
      req.body.coord_y,
    );

    if (tile.length === 0) {
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
