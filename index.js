import express from "express";
import consign from "consign";

const app = express();

consign()
    .include("app/models")
    .then("libs/middlewares.js")
    .then("app/routes")
    .then("libs/boots.js")
    .into(app);
