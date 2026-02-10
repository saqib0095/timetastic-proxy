const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = "5480ae6b-17c2-4064-ae03-50d061454610";

let lastCall = 0;

app.get("/", (req, res) => {
  res.send("Proxy running ✅");
});

app.get("/diary", async (req, res) => {
  try {
    const now = Date.now();

    if (now - lastCall < 1000) {
      return res.status(429).json({ error: "Rate limited — wait 1 sec" });
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

    const data = await r.text();
    res.status(r.status).send(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3000);
