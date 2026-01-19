import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

class BoatRepository {
  async readAll(filter?: { name: string }) {
    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    if (filter == null) {
      const [rows] = await databaseClient.query<Rows>(
        "SELECT boat.id, boat.name, boat.coord_x, boat.coord_y, tile.type, tile.has_treasure FROM boat JOIN tile ON boat.id = tile.id",
      );

      return rows as Boat[];
    }

    const [rows] = await databaseClient.query<Rows>(
      "SELECT boat.id, boat.name, boat.coord_x, boat.coord_y, tile.type, tile.has_treasure FROM boat JOIN tile ON boat.id = tile.id WHERE boat.name = ?",
      [filter?.name],
    );

    // Return the array of tiles
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE boat SET coord_x = ?, coord_y = ? WHERE id = ?",
      [boatToUpdate.coord_x, boatToUpdate.coord_y, boatToUpdate.id],
    );

    return result.affectedRows;
  }
}

export default new BoatRepository();
