import type { RequestHandler } from "express";

import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    let where: { name: string } | undefined;

    if (req.query.name) {
      where = { name: req.query.name as string };
    }

    const boats = await boatRepository.readAll(where);
    res.json(boats);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const boatId = Number(req.params.id);
    if (Number.isNaN(boatId)) {
      res.status(400).json({ error: "ID invalide" });
      return;
    }

    const position = {
      id: boatId,
      coord_x: Number(req.body.coord_x),
      coord_y: Number(req.body.coord_y),
    };

    const success = await boatRepository.update(position);

    if (success === 0) {
      res.status(404).json({ error: "Bateau non trouvé" });
      return;
    }

    if (!success) {
      res.status(500).json({ error: "Erreur mise à jour" });
      return;
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  edit,
};
