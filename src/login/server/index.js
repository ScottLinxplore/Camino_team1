import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import pkg from "pg";
import nodemailer from "nodemailer";
import crypto from "crypto";
dotenv.config();

const { Pool } = pkg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const app = express();
app.use(cors());
app.use(express.json());

//寄信後端

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const sendVerificationEmail = async (email, token) => {
  const link = `http://localhost:5173/verify?token=${token}`;
  await transporter.sendMail({
    from: `"Camino App 驗證" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "請驗證你的帳號",
    html: `
      <h2>歡迎加入 Camino!</h2>
      <p>請點擊下方連結完成驗證：</p>
      <a href="${link}">${link}</a>
    `,
  });
};

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const token = crypto.randomBytes(32).toString("hex");

  try {
    await pool.query(
      `INSERT INTO users (email, password, verified, verify_token)
       VALUES ($1, $2, false, $3)`,
      [email, password, token]
    );

    await sendVerificationEmail(email, token);

    res.status(200).json({ message: "註冊成功，請查收驗證信" });
  } catch (err) {
    if (err.code === "23505") {
      // 👇 捕捉 email 重複錯誤
      return res.status(409).json({ error: "此 Email 已註冊過" });
    }

    console.error("❌ 註冊失敗：", err);
    res.status(500).json({ error: "伺服器錯誤" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "帳號或密碼錯誤" });
    }

    if (!user.verified) {
      return res.status(403).json({ message: "請先驗證信箱後再登入" });
    }

    res.status(200).json({ message: "登入成功", userId: user.id });
  } catch (err) {
    console.error("❌ 登入失敗：", err);
    res.status(500).json({ error: "伺服器錯誤" });
  }
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  console.log("📥 收到查詢使用者 ID：", id);

  try {
    const result = await pool.query(
      `SELECT id, email, name, phone, nationality, sex FROM users WHERE id = $1`,
      [id]
    );
    console.log("📤 查詢結果：", result.rows);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "找不到使用者" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ 讀取使用者失敗：", err.message);
    res.status(500).json({ error: "皮卡丘:伺服器錯誤", detail: err.message });
  }
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  // 從前端 body 拿到要更新的欄位
  const { name, phone, nationality, sex } = req.body;
  try {
    await pool.query(
      `UPDATE users
     SET name = $1,
         phone = $2,
         nationality = $3,
         sex = $4
     WHERE id = $5`,
      [name, phone, nationality, sex, id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("❌ 更新使用者失敗：", err);
    res.status(500).json({ error: "伺服器錯誤" });
  }
});

//收藏
app.post("/favorites", async (req, res) => {
  const { userId, attractionId } = req.body;
  console.log("📥 收到新增收藏：", userId, attractionId); // ← 加這行！

  try {
    await pool.query(
      "INSERT INTO favorites (user_id, attraction_id) VALUES ($1, $2)",
      [userId, attractionId]
    );
    res.status(200).json({ message: "已加入收藏" });
  } catch (err) {
    console.error("❌ 新增收藏失敗：", err); // ← 印出完整錯誤
    res.status(500).json({ error: "伺服器錯誤", detail: err.message });
  }
});

app.delete("/favorites", async (req, res) => {
  const { userId, attractionId } = req.body;
  console.log("📥 收到取消收藏：", userId, attractionId); // ← 加這行！

  try {
    await pool.query(
      "DELETE FROM favorites WHERE user_id = $1 AND attraction_id = $2",
      [userId, attractionId]
    );
    res.status(200).json({ message: "已取消收藏" });
  } catch (err) {
    console.error("❌ 移除收藏失敗：", err); // ← 印出錯誤
    res.status(500).json({ error: "伺服器錯誤", detail: err.message });
  }
});

app.get("/verify", async (req, res) => {
  const { token } = req.query;

  try {
    const result = await pool.query(
      `UPDATE users
       SET verified = true, verify_token = NULL
       WHERE verify_token = $1
       RETURNING id`,
      [token]
    );

    if (result.rowCount === 0) {
      return res.status(400).send("❌ 驗證失敗，連結無效或已過期");
    }

    res.send("✅ 驗證成功，請返回登入頁面");
  } catch (err) {
    console.error("❌ 信箱驗證失敗：", err);
    res.status(500).send("伺服器錯誤");
  }
});

app.get("/sight", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT sight_id, cname, ename, feature, img_url FROM sight ORDER BY sight_id"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("❌ 讀取景點失敗：", err);
    res.status(500).json({ message: "伺服器錯誤" });
  }
});

app.get("/favorites/details/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `SELECT s.sight_id, s.cname, s.feature, s.img_url
       FROM favorites f
       JOIN sight s ON f.attraction_id = s.sight_id
       WHERE f.user_id = $1`,
      [userId]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("❌ 收藏細節查詢失敗", err);
    res.status(500).json({ message: "伺服器錯誤", error: err });
  }
});

app.listen(3001, () => {
  console.log("✅ Server running at http://localhost:3001");
});
