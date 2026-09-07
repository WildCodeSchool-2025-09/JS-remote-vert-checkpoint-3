import type { RequestHandler } from "express";

import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database (optionally filtered by name)
    const boats = await boatRepository.readAll(req.query as { name?: string });

    // Respond with the boats in JSON format
    res.json(boats);
  } catch (err) {
    // Pass any errors to the error-handling middleware
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

    await boatRepository.update(boat);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  edit,
};
