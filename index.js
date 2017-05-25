import express from "express";
import consign from "consign";

const app = express();
console.log('here');
consign()
    .include("libs/config.js")
    .then("libs/db.js")
    .then("libs/middlewares.js")
    .then("app/routes")
    .then("libs/boots.js")
    .into(app);
