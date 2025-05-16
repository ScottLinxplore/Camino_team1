import React, { useState, useEffect } from "react";
import styles from "./Account.module.css";

const Account = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    nationality: "",
    sex: "",
  });

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:3001/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setForm({
          name: data.name || "",
          phone: data.phone || "",
          nationality: data.nationality || "",
          sex: data.sex || "",
        });
      })
      .catch((err) => {
        console.error("讀取使用者失敗", err);
      });
  }, [userId]);

  if (!user) return <p>讀取中…</p>;

  const handleSave = () => {
    fetch(`http://localhost:3001/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("更新失敗");
        setUser({ ...user, ...form });
        setEditing(false);
      })
      .catch(console.error);
  };

  return (
    <div className={styles.accountContainer}>
      <h2 className={styles.accountTitle}>我的帳戶</h2>
      <div className={styles.accountRow}>
        <span className={styles.accountLabel}>Email：</span>
        {user.email}
      </div>

      {editing ? (
        <>
          <div className={styles.accountRow}>
            <span className={styles.accountLabel}>姓名：</span>
            <input
              className={styles.accountInput}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div className={styles.accountRow}>
            <span className={styles.accountLabel}>手機：</span>
            <input
              className={styles.accountInput}
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
            />
          </div>
          <div className={styles.accountRow}>
            <span className={styles.accountLabel}>國籍：</span>
            <input
              className={styles.accountInput}
              value={form.nationality}
              onChange={(e) =>
                setForm((f) => ({ ...f, nationality: e.target.value }))
              }
            />
          </div>
          <div className={styles.accountRow}>
            <span className={styles.accountLabel}>性別：</span>
            <input
              className={styles.accountInput}
              value={form.sex}
              onChange={(e) => setForm((f) => ({ ...f, sex: e.target.value }))}
            />
          </div>

          <div className={styles.accountButtons}>
            <button className={styles.accountButton} onClick={handleSave}>
              儲存
            </button>
            <button
              className={styles.accountButton}
              onClick={() => setEditing(false)}
            >
              取消
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.accountRow}>
            <span className={styles.accountLabel}>姓名：</span>
            {user.name || "-"}
          </div>
          <div className={styles.accountRow}>
            <span className={styles.accountLabel}>手機：</span>
            {user.phone || "-"}
          </div>
          <div className={styles.accountRow}>
            <span className={styles.accountLabel}>國籍：</span>
            {user.nationality || "-"}
          </div>
          <div className={styles.accountRow}>
            <span className={styles.accountLabel}>性別：</span>
            {user.sex || "-"}
          </div>

          <div className={styles.accountButtons}>
            <button onClick={() => setEditing(true)}>編輯</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Account;
