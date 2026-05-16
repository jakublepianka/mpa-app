import { pool } from "../db/db.connection";

export const createUser = async (userId: string): Promise<void> => {
  await pool.query(
    "INSERT INTO users(id) VALUES($1)", 
    [userId]
  );
};

