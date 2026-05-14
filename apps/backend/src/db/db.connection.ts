import { Pool } from "pg";
import { env } from "../config/env.config";

const pool = new Pool({
  connectionString: env.DB_URL,
});

export { pool };
