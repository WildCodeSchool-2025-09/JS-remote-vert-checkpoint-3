import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
  tile_id: number;
  type: string;
  has_treasure: boolean;
};

class BoatRepository {
  async readAll(where?: { name: string }) {
    // Execute the SQL SELECT query to retrieve all boats with tile info using JOIN
    const [rows] = await databaseClient.query<Rows>(
      `SELECT
        boat.id,
        boat.name,
        boat.coord_x,
        boat.coord_y,
        tile.id AS tile_id,
        tile.type,
        tile.has_treasure
      FROM boat
      INNER JOIN tile ON boat.coord_x = tile.coord_x AND boat.coord_y = tile.coord_y
      ORDER BY boat.coord_y, boat.coord_x`,
    );

    // Return the array of boats with tile info
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    const [result] = await databaseClient.query<Result>(
      "update boat set coord_x = ?, coord_y = ? where id = ?",
      [boatToUpdate.coord_x, boatToUpdate.coord_y, boatToUpdate.id],
    );
    return result.affectedRows;
  }
}

export default new BoatRepository();
