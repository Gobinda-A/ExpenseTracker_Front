// config.js

// Read environment from global var or default to "dev"
// const ENV = window.env || "dev";

const ENV = window.env || "prod";

// Define environment-specific configs
const CONFIG = {
  dev: {
    BASE_URL: "http://localhost:8080/api",
  },
  prod: {
    BASE_URL: "https://gobindaexpensetrackerapp.up.railway.app/api",
  },
};

// Select config
const BASE_URL = CONFIG[ENV].BASE_URL;

console.log(`Running in ${ENV} mode`);
