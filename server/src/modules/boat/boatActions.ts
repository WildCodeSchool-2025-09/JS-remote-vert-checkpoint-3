import type { RequestHandler } from "express";
import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const boats = await boatRepository.readAll();
    res.json(boats);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const boatToUpdate = {
      id: Number(req.params.id),
      coord_x: Number(req.body.coord_x),
      coord_y: Number(req.body.coord_y),
    };

    const affectedRows = await boatRepository.update(boatToUpdate);

    if (!affectedRows) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, edit };
