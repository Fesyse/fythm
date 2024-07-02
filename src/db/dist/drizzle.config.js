"use strict";
exports.__esModule = true;
require("@/db/envConfig");
var drizzle_kit_1 = require("drizzle-kit");
exports["default"] = drizzle_kit_1.defineConfig({
    schema: "./src/db/schema.ts",
    out: "./src/db/drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.POSTGRES_URL
    }
});
