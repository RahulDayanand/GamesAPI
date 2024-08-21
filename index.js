const express = require("express");
const app = express();
const cors = require("cors");
const { getAllGames, getGameById } = require("./controllers");
app.use(express.json());
app.use(cors());

//Exercise 1: Retrieve All Games

app.get("/games", (req, res) => {
  let games = getAllGames();
  res.json(games);
});

//Exercise 2: Retrieve Game by ID

app.get("/games/details/:id", (req, res) => {
  let game = getGameById(parseInt(req.params.id));
  res.json(game);
});

module.exports = {
  app,
}