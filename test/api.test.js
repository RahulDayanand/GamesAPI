const { app } = require("../index");
const { getAllGames } = require("../controllers/index");
const http = require("http");
const request = require("supertest");
let server;

jest.mock("../controllers/index", () => ({
  ...jest.requireActual("../controllers/index"),
  getAllGames: jest.fn(),
}));

beforeAll(() => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(() => {
  server.close();
});

describe("Controllers Testing Time", () => {
  it("Exercise 5: Mock the Get All Games Function", async () => {
    let mockGames = [
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ];

    getAllGames.mockReturnValue(mockGames);
    let games = getAllGames();
    expect(games).toEqual(mockGames);
    expect(games.length).toBe(3);
  });
});

describe("API Endpoints Testing Time", () => {
  it("Exercise 3: Test Retrieve All Games", async () => {
    let response = await request(server).get("/games");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ]);
    expect(response.body.length).toBe(3);
  });

  it("Exercise 4: Test Retrieve Game by ID", async () => {
    let response = await request(server).get("/games/details/2");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      gameId: 2,
      title: "Red Dead Redemption 2",
      genre: "Action",
      platform: "PlayStation 4",
    });
  });
});
