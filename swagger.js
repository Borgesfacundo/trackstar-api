const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "TrackStar API",
    description: "Personal Task & Habit Tracker API",
  },
  host: process.env.RENDER_URL || "localhost:3000",
  schemes: ["http", "https"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/index.js"];

//this wull generate swagger-output.json
swaggerAutogen(outputFile, endpointsFiles, doc);
