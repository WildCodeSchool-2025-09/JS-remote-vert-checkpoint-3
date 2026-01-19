import type { RequestHandler } from "express";
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

  if (
    typeof coord_x !== "number" ||
    typeof coord_y !== "number" ||
    coord_x < 0 ||
    coord_x > 11 ||
    coord_y < 0 ||
    coord_y > 5
  ) {
    res.sendStatus(422);
  }

  next();
};

export default {
  browse,
  validate,
};
