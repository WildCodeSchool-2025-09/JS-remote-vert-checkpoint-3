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

    if (Number.isNaN(id)) {
      res.status(400).json({ message: "ID invalide" });
      return;
    }

    const coord_x = req.body.coord_x;
    const coord_y = req.body.coord_y;

    const affectedRows = await boatRepository.update({ id, coord_x, coord_y });

    if (affectedRows === 0) {
      res.status(404).json({ message: "Bateau non trouvé" });
      return;
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default {
  browse,
  edit,
};
