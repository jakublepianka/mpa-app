import swaggerJsdoc from "swagger-jsdoc";
import { schemas } from "./schemas";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PubMed Analysis API",
      version: "1.0.0",
      description: "API for PubMed article analysis",
    },
    components: {
      schemas: schemas,
    },
  },
  apis: ["./src/routes/*.ts"],
});
