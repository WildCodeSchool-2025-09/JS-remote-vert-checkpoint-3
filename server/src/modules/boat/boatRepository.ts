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
      `
    SELECT
      boat.id AS boat_id,
      boat.name AS boat_name,
      boat.coord_x AS boat_coord_x,
      boat.coord_y AS boat_coord_y,
      tile.type AS tile_type,
      tile.has_treasure AS tile_has_treasure
    FROM boat
    LEFT JOIN tile
      ON boat.coord_x = tile.coord_x AND boat.coord_y = tile.coord_y
    ORDER BY boat.coord_y, boat.coord_x
    `,
    );

    return rows.map((row) => ({
      id: row.boat_id,
      name: row.boat_name,
      coord_x: row.boat_coord_x,
      coord_y: row.boat_coord_y,
      type: row.tile_type,
      has_treasure: !!row.tile_has_treasure,
    }));
  }

  /*
  async readAll(where?: { name: string }) {
    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    const [rows] = await databaseClient.query<Rows>(
      "select * from boat order by coord_y, coord_x",
    );

    // Return the array of tiles
    return rows as Boat[];
  }*/

  async update(boatToUpdate: Partial<Boat>) {
    // your code here
    const { id, name, coord_x, coord_y } = boatToUpdate;

    const [result] = await databaseClient.query<Result>(
      `
    UPDATE boat
    SET
      name = ?,
      coord_x = ?,
      coord_y = ?
    WHERE id = ?
    `,
      [name, coord_x, coord_y, id],
    );

    return result.affectedRows;
  }
}

export default new BoatRepository();
