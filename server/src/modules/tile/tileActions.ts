import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
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
  const { coord_x, coord_y } = req.body;

  // if (typeof coord_x !== "number" || typeof coord_y !== "number") {
  //   res.sendStatus(422);
  //   return;
  // }

  // if (coord_x >= 12 || coord_x < 0) {
  //   res.sendStatus(422);
  //   return;
  // }

  // if (coord_y >= 6 || coord_y < 0) {
  //   res.sendStatus(422);
  //   return;
  // }

  const result = await tileRepository.readByCoordinates(coord_x, coord_y);

  if (result.length === 0) {
    res.sendStatus(StatusCodes.UNPROCESSABLE_ENTITY);
    return;
  }

  next();
};

export default {
  browse,
  validate,
};
