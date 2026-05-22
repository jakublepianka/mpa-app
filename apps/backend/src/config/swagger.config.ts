import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PubMed Analysis API",
      version: "1.0.0",
      description: "API for PubMed article analysis",
    },
  },
  apis: ["./src/routes/*.ts"],
});