import { pool } from "../db/db.connection";
import { AnalysisResult } from "../services/analysis/analysis.types";
import { AnalysisRecord } from "../types/analysis.record";

export const createAnalysis = async (
  userId: string,
  query: string,
  analysis: AnalysisResult,
): Promise<AnalysisRecord> => {
  const { rows } = await pool.query(
    `INSERT INTO analyses(
      user_id,
      query, 
      analysis 
    ) 
    VALUES($1, $2, $3)
    RETURNING *`,
    [userId, query, analysis],
  );

  return rows[0];
};

export const getAnalysisById = async (analysisId: string): Promise<AnalysisRecord | null> => {
  const { rows } = await pool.query(
    "SELECT * FROM analyses WHERE id = $1", 
    [analysisId]
  );

  return rows[0] ?? null;
};

export const getUserAnalyses = async (userId: string): Promise<AnalysisRecord[]> => {
  const { rows } = await pool.query(
    `SELECT *
     FROM analyses 
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId],
  );

  return rows;
};

export const deleteAnalysis = async (analysisId: string): Promise<boolean> => {
  const result = await pool.query(
    "DELETE FROM analyses WHERE id = $1",
    [analysisId]
  );

  return result.rowCount === 1;
};