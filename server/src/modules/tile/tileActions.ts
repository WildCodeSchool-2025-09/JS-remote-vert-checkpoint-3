import type { RequestHandler } from "express";

import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  const tiles = await tileRepository.readAll();
  try {
    // Respond with the boats in JSON format
    res.json(tiles);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
};

export default {
  browse,
  validate,
};
