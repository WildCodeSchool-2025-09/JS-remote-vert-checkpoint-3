import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
  type: string;
  has_treasure: boolean;
};

class BoatRepository {
  async readAll(where?: { name: string }) {
    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    const [rows] = await databaseClient.query<Rows>(
      "SELECT boat.id, boat.name, boat.coord_x, boat.coord_y, tile.type, tile.has_treasure FROM boat JOIN tile ON boat.coord_x = tile.coord_x AND boat.coord_y = tile.coord_y ORDER BY boat.coord_y, boat.coord_x",
    );

    // Return the array of tiles
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    // your code here
    const [Result] = await databaseClient.query<Result>(
      "UPDATE boat SET coord_y = ?, coord_x = ? WHERE id = ?",
      [boatToUpdate.coord_y, boatToUpdate.coord_x, boatToUpdate.id],
    );
    return Result.affectedRows;
  }
}

export default new BoatRepository();
