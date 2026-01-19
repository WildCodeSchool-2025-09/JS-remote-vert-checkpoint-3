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
    const id = Number(req.params.id);
    const { coord_x, coord_y } = req.body;

    // Appel au repository pour mettre à jour le bateau

    const updated = await boatRepository.update({ id, coord_x, coord_y });

    if (updated) {
      // Mise à jour réussie → 204 No Content
      res.sendStatus(204);
    } else {
      // Aucun bateau trouvé avec cet ID → 404
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  edit,
};
