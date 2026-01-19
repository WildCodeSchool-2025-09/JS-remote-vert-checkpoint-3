import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
  tile_id: number;
  tile_type: string;
  tile_has_treasure: boolean;
};

class BoatRepository {
  async readAll(where?: { name: string }) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT boat.id AS boat_id, boat.name, boat.coord_x, boat.coord_y, tile.id AS tile_id, tile.type, tile.has_treasure FROM boat JOIN tile ON tile.id = boat.tile_id WHERE boat.name = ?",
      [],
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
