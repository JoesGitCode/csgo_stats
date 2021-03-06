const express = require("express");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

dotenv.config({ path: "./config.env" });

const app = express();

app.get("/api/v1/profile/steam/:steamid", async (req, res) => {
  const headers = { "TRN-Api-Key": process.env.API_KEY };
  const apiUrl = process.env.API_URL;
  const { steamid } = req.params;

  try {
    const response = await fetch(`${apiUrl}/profile/steam/${steamid}`, {
      headers
    });

    const data = await response.json();

    if (data.errors && data.errors.length > 0) {
      return res.status(404).json({
        message:
          "Profile not found. Try typing your ID again or make you steam account public"
      });
    }

    res.json(data);
  } catch (error) {
    console.error(error, "Server error");
    res.status(500);
  }
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
