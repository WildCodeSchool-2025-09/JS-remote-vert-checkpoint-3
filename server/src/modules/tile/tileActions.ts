import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const invitations = await tileRepository.readAll();

    res.json(invitations);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  const coordX = Number(req.body.coord_x);
  const coordY = Number(req.body.coord_y);

  if (!Number.isNaN(coordX) && !Number.isNaN(coordY)) {
    const tiles = await tileRepository.readByCoordinates(coordX, coordY);
    if (tiles.length > 0) {
      return next();
    }
  }

  res.sendStatus(422);
};

export default {
  browse,
  validate,
};
