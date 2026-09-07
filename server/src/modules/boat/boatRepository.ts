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
      `SELECT
       b.id, 
       b.coord_x,
       b.coord_y,
       b.name,
       t.type,
       t.has_treasure
     FROM boat AS b
     INNER JOIN tile AS t
       ON b.coord_x = t.coord_x AND b.coord_y = t.coord_y`,
    );

    // Return the array of tiles
    return rows as Boat[];
  }

  async update(updatedBoat: Partial<Boat>) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE boat SET coord_x=?, coord_y=? where id=?",
      [updatedBoat.coord_x, updatedBoat.coord_y, updatedBoat.id],
    );
    return result.affectedRows;
  }
}

export default new BoatRepository();
