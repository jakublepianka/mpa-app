import { Request, Response } from "express";
import { fetchESearch } from "../services/ncbi/ncbi.service";

export const getHealthStatus = (req: Request, res: Response) => {
  res.json({ status: "okey" });
};

export const getAnalysisResults = async (req: Request, res: Response) => {
  const { term } = req.query;


  if (typeof term !== "string") {
    return res.status(400).json({ error: "term must be a string" });
  }

  // do analysis
    // call ncbi.service to fetch ESearch response
    // ncbi.service maps ESearch response into json
    // the IDs from ESearch are saved into an array (?)
  const esearch = await fetchESearch(term);
  
  res.status(200).json(esearch);
    
    // EFetch is called in batches of few hundred
      //  with a limit of 10 calls per second
    // EFetch is
     
  // save analysis json
  // return analysis json
};