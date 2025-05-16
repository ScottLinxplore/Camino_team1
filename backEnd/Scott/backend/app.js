require("dotenv").config();
const http = require("http");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const requestHandler = async (req, res) => {
  if (req.url === "/route") {
    try {
      res.setHeader("Access-Control-Allow-Origin", "*");
      const result = await pool.query('SELECT * FROM "routes"');
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result.rows));
    } catch (err) {
      console.error("❌ 錯誤：", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("伺服器錯誤");
    }
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello from Neon database backend");
  }
};

http.createServer(requestHandler).listen(3002, () => {
  console.log("Server running at http://localhost:3002");
});
