import express from "express";
import consign from "consign";

const app = express();

consign()
    .include("lib/dbs.js")
    .then("app/models")
    .then("libs/middlewares.js")
    .then("app/routes")
    .then("libs/boots.js")
    .into(app);
