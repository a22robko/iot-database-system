const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { BigQuery } = require("@google-cloud/bigquery");

const app = express();
const bigquery = new BigQuery(); 
const publicDir = path.join(__dirname, "public");


app.use(cors());
app.use(express.text({ type: "*/*", limit: "5mb" }));

// ===== Static + startsida
app.use(express.static(publicDir, {
  setHeaders(res) { res.set("Cache-Control", "no-cache, no-store, must-revalidate"); }
}));
app.get("/", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

// ===== BigQuery (visa alla rader från Biljetter3)
app.get("/bigquery", async (_req, res) => {
  try {
    const query = `
      SELECT FirstName, LastName, Age, Height
      FROM \`prj-iot-123.csv_example_1.Biljetter3\`
      ORDER BY FirstName, LastName
    `;
    const [rows] = await bigquery.query({ query /* , location: "EU" eller "US" */ });
    res.json(rows);
  } catch (err) {
    console.error("BigQuery error:", err.message);
    if (err.errors) console.error(err.errors);
    res.status(500).send("Error querying BigQuery");
  }
});

// ===== Spara/Läsa CSV — använd /tmp i App Engine
const dataFile = path.join(process.env.GAE_ENV ? "/tmp" : __dirname, "biljetter.csv");

app.post("/save", (req, res) => {
  fs.writeFile(dataFile, req.body || "", "utf8", (err) =>
    err ? res.status(500).send("Write failed") : res.send("OK")
  );
});

app.get("/read", (_req, res) => {
  fs.readFile(dataFile, "utf8", (err, text) =>
    err ? res.status(404).send("") : res.type("text/plain").send(text)
  );
});

// ===== Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server running on", PORT));
