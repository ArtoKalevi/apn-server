const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const apnTable = [
  { imsiPrefix: "24405123", customer: "Acme Oy", operator: "Elisa", apn: "acme.private.elisa.fi" },
  { imsiPrefix: "24412098", customer: "Beta Oy", operator: "Telia", apn: "beta.m2m.telia.fi" }
];

const queries = [];
const clientStatus = {};

app.get('/get-apn', (req, res) => {
  const imsi = req.query.imsi;
  const client = req.query.client || "unknown";

  if (!imsi) return res.status(400).json({ error: "Missing imsi parameter" });

  const entry = apnTable.find(item => imsi.startsWith(item.imsiPrefix));
  if (!entry) return res.status(404).json({ error: "APN not found", imsi });

  const result = {
    imsi,
    customer: entry.customer,
    operator: entry.operator,
    apn: entry.apn,
    client,
    timestamp: new Date().toISOString()
  };

  queries.unshift(result);
  if (queries.length > 100) queries.pop();
  clientStatus[client] = result.timestamp;

  res.json(result);
});

app.get('/', (req, res) => {
  res.send("✅ APN server running");
});

app.listen(port, () => {
  console.log(`APN server running at http://0.0.0.0:${port}`);
});
