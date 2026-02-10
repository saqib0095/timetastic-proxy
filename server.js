const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = "5480ae6b-17c2-4064-ae03-50d061454610";

app.get("/diary", async (req, res) => {
  const { from, to } = req.query;

  try {
    const r = await fetch(
      `https://app.timetastic.co.uk/api/absences?from=${from}&to=${to}`,
      { headers: { Authorization: "Bearer " + API_KEY } }
    );

    const data = await r.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: "failed" });
  }
});

app.listen(process.env.PORT || 3000);
