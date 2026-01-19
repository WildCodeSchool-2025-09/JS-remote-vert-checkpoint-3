import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

class BoatRepository {
  async readAll(where?: { name: string }) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT boat.id, boat.name,
        boat.coord_x,
        boat.coord_y,
        tile.type, tile.has_treasure
        FROM boat
        LEFT JOIN tile ON boat.coord_x = tile.coord_x AND boat.coord_y = tile.coord_y`,
    );

    // Return the array of tiles
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    console.log("repo", boatToUpdate);

    const [result] = await databaseClient.query<Result>(
      "UPDATE boat SET coord_x = ?, coord_y = ? WHERE id = ?",
      [boatToUpdate.coord_x, boatToUpdate.coord_y, boatToUpdate.id],
    );

    return result.affectedRows;
  }
}

export default new BoatRepository();
