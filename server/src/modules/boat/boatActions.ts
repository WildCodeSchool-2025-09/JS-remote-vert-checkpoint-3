import type { RequestHandler } from "express";

import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const boats = await boatRepository.readAll(req.query);

    // Respond with the boats in JSON format
    res.json(boats);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    //Get the boat's id
    const id = Number(req.params.id);
    //Get coord_x
    const coord_x = req.body.coord_x;
    //Get coord_y
    const coord_y = req.body.coord_y;

    const result = await boatRepository.update({ id, coord_x, coord_y });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  edit,
};
