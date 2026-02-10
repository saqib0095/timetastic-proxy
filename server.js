const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = "5480ae6b-17c2-4064-ae03-50d061454610";

app.get("/", (req, res) => {
  res.send("Proxy running ✅");
});

app.get("/diary", async (req, res) => {
  const { from, to } = req.query;

  try {
    const r = await fetch(
      `https://app.timetastic.co.uk/api/absences?from=${from}&to=${to}`,
      {
        headers: {
          Authorization: "Bearer " + API_KEY,
          Accept: "application/json"
        }
      }
    );

    const text = await r.text();

    // send back EXACT Timetastic response
    res.status(r.status).send(text);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3000);
