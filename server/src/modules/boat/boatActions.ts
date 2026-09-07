import type { RequestHandler } from "express";

import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const boats = await boatRepository.readAll();

    // Respond with the boats in JSON format
    res.json(boats);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const boatId = Number(req.params.id);

    const boatToUpdate = {
      id: boatId,
      coord_x: Number(req.body.coord_x),
      coord_y: Number(req.body.coord_y),
    };

    const editBoats = await boatRepository.update(boatToUpdate);
    if (editBoats === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  edit,
};
