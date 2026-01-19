import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

type BoatWithTile = Boat & {
  type?: string;
  has_treasure?: boolean;
};

class BoatRepository {
  async readAll(where?: { name: string }): Promise<BoatWithTile[]> {
    const query = `
      SELECT 
        b.id, b.name, b.coord_x, b.coord_y,
        t.type, t.has_treasure
      FROM boat AS b
      LEFT JOIN tile AS t ON b.coord_x = t.coord_x AND b.coord_y = t.coord_y
      ORDER BY b.coord_y, b.coord_x
    `;

    const [rows] = await databaseClient.query<Rows>(query);
    return rows as BoatWithTile[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    const { id, coord_x, coord_y } = boatToUpdate;

    const [result] = await databaseClient.query<Result>(
      "UPDATE boat SET coord_x=?, coord_y=? where id=?",
      [coord_x, coord_y, id],
    );
    return result.affectedRows;
  }
}
export default new BoatRepository();
