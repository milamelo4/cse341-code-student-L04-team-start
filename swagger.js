const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Temple API",
    description: "API documentation for the Temple API",
  },
  host: "localhost:8080", // Update to your deployed host if needed
  schemes: ["http"], // Change to ['https'] if using HTTPS
};

const outputFile = "./swagger.json"; // Generated Swagger file
const endpointsFiles = ["./routes/temple.js"]; // Entry points to parse routes

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated successfully!");
});
