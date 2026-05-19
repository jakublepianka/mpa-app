import { pool } from "../db/db.connection";
import type { AnalysisResult } from "../../../../packages/shared/analysisResult.types";
import type { AnalysisRecord } from "../types/analysis.record";

export const createAnalysis = async (
  userId: string,
  query: string,
  analysis: AnalysisResult,
): Promise<AnalysisRecord> => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(
      `
      INSERT INTO users(id)
      VALUES($1)
      ON CONFLICT DO NOTHING`,
      [userId],
    );

    const { rows } = await client.query(
      `
      INSERT INTO analyses(
        user_id,
        query, 
        analysis 
      ) 
      VALUES($1, $2, $3)
      RETURNING *`,
      [userId, query, analysis],
    );

    await client.query("COMMIT");

    return rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const getAnalysisById = async (
  analysisId: string,
): Promise<AnalysisRecord | null> => {
  const { rows } = await pool.query("SELECT * FROM analyses WHERE id = $1", [
    analysisId,
  ]);

  return rows[0] ?? null;
};

export const getAnalysisByQuery = async (
  userId: string,
  query: string,
): Promise<AnalysisRecord | null> => {
  const { rows } = await pool.query(
    "SELECT * FROM analyses WHERE user_id = $1 AND query = $2",
    [userId, query],
  );

  return rows[0];
};

export const getUserAnalyses = async (
  userId: string,
): Promise<AnalysisRecord[]> => {
  const { rows } = await pool.query(
    `SELECT *
     FROM analyses 
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId],
  );

  return rows;
};

export const deleteAnalysisById = async (analysisId: string): Promise<boolean> => {
  const result = await pool.query("DELETE FROM analyses WHERE id = $1", [
    analysisId,
  ]);

  return result.rowCount === 1;
};
