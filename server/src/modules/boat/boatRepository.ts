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
    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    const [rows] = await databaseClient.query<Rows>(
      "select boat.id, boat.name, boat.coord_x, boat.coord_y, tile.type, tile.has_treasure from boat inner join tile on boat.coord_x = tile.coord_x AND boat.coord_y = tile.coord_y order by coord_y, coord_x",
    );

    // Return the array of tiles
    return rows as Boat[];
  }

  async update(boat: Partial<Boat>) {
    const [result] = await databaseClient.query<Result>(
      "update boat set name = ?, coord_x = ?, coord_y = ? where id = ?",
      [boat.name, boat.coord_x, boat.coord_y, boat.id],
    );
    return result.affectedRows;
  }
}

export default new BoatRepository();
