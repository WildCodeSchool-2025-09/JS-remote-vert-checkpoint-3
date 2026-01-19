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
    const boat = {
      id: Number(req.params.id),
      coord_x: req.body.coord_x,
      coord_y: req.body.coord_y,
    };

    const updatedBoat = await boatRepository.update(boat);
    if (updatedBoat === 0) {
      res.status(404).send("Boat not found");
    } else {
      res.status(204).send("Boat updated successfully");
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  edit,
};
