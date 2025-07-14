import env from "dotenv";
env.config();

const config = {
  env: process.env.NODE_ENV,
  port: Number(process.env.PORT) || 8000,
  debug: process.env.APP_DEBUG === "true",
  secretKey: process.env.SECRET_KEY || "",
  logLevel: process.env.LOG_LEVEL || "info",
};

export default config;
