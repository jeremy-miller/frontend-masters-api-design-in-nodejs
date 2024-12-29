import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || "local";

let envConfig;

if (stage === "production") {
  envConfig = require("./prod").default;
} else if (stage === "testing") {
  envConfig = require("./testing").default;
}

const localConfig = {
  stage,
  env: process.env.NODE_ENV,
  port: 3000,
  secrets: {
    passwordSaltRounds: process.env.PASSWORD_SALT_ROUNDS,
    jwtSecret: process.env.JWT_SECRET,
    dbUrl: process.env.DATABASE_URL,
  },
};

export default merge(localConfig, envConfig);
