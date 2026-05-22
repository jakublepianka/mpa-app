export const schemas = {
  AnalysisResult: {
    type: "object",
    properties: {
      totalArticles: { type: "number" },
      dateCounts: {
        type: "object",
        additionalProperties: { type: "number" },
      },
      publicationTypeCounts: {
        type: "object",
        additionalProperties: { type: "number" },
      },
      keywordCounts: {
        type: "object",
        additionalProperties: { type: "number" },
      },
      sampleTypeCounts: {
        type: "object",
        additionalProperties: { type: "number" },
      },
      sampleSizeSummary: {
        type: "object",
        properties: {
          average: { type: "number", nullable: true },
          min: { type: "number", nullable: true },
          max: { type: "number", nullable: true },
        },
      },
    },
  },

  AnalysisRecord: {
    type: "object",
    properties: {
      id: { type: "string" },
      user_id: { type: "string" },
      query: { type: "string" },
      analysis: {
        $ref: "#/components/schemas/AnalysisResult",
      },
      created_at: {
        type: "string",
        format: "date-time",
      },
    },
  },
};
