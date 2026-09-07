import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

class BoatRepository {
  async readAll(where?: { name?: string }) {
    let sql =
      "select boat.id, boat.name, boat.coord_x, boat.coord_y, tile.type, tile.has_treasure from boat join tile on boat.coord_x = tile.coord_x and boat.coord_y = tile.coord_y";

    const values: string[] = [];

    if (where?.name) {
      sql += " where boat.name = ?";
      values.push(where.name);
    }

    sql += " order by boat.coord_y, boat.coord_x";

    const [rows] = await databaseClient.query<Rows>(sql, values);

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
