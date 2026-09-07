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
  type ValidationError = {
    field: string;
    message: string;
  };
  try {
    const errors: ValidationError[] = [];

    const { coord_x, coord_y } = req.body;

    const tiles = await tileRepository.readByCoordinates(coord_x, coord_y);

    if (tiles.length === 0) {
      errors.push({
        field: "coord_x, coord_y",
        message: "Please enter a correct value",
      });
    }

    // version sans le readByCoordinates du tileRepository :
    // if (coord_x == null || coord_x < 0 || coord_x > 11) {
    //   errors.push({ field: "coord_x", message: "It should be between 0 and 11" });
    // }

    // if (coord_y == null || coord_y < 0 || coord_y > 5) {
    //   errors.push({ field: "coord_y", message: "It should be between 0 and 5" });
    // }

    if (errors.length === 0) {
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
