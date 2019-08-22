const express = require("express");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

dotenv.config({ path: "./config.env" });

const app = express();

app.get("/api/v1/profile/steam/:steamid", async (req, res) => {
  const headers = { "TRN-Api-Key": process.env.API_KEY };
  const apiUrl = process.env.API_URL;
  const { steamid } = req.params;

  const response = await fetch(`${apiUrl}/profile/steam/${steamid}`, {
    headers
  });

  const data = await response.json();

  res.json(data);
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
