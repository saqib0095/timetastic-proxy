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
  const now = Date.now();

  if (now - lastCall < 1000) {
    return res.status(429).json({ error: "Wait 1 second between requests" });
  }

  lastCall = now;

  const { from, to } = req.query;

  const r = await fetch(
    `https://app.timetastic.co.uk/api/absences?start=${from}&end=${to}`,
    {
      headers: {
        Authorization: "Bearer " + API_KEY,
        Accept: "application/json"
      }
    }
  );

  const text = await r.text();
  res.status(r.status).send(text);
});

app.listen(process.env.PORT || 3000);


