import { useNavigate } from "react-router";
import React from "react";
import { createAnalysis } from "../api/analysis.api";
import type { Analysis } from "../api/analysis.types";

export const SearchPage = () => {
  const navigate = useNavigate();
  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const query = formData.get("query");

    if (typeof query !== "string") return;

    const analysis: Analysis = await createAnalysis(query);

    navigate(`/analyses/${analysis.id}`, {
      state: analysis,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search-term">Analyze</label>

      <input
        type="text"
        id="search-term"
        name="query"
        placeholder="Vitamin D supplementation"
      />

      <button type="submit">Analyze</button>
    </form>
  );
};
