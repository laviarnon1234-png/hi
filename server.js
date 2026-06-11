const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// חיבור למסד הנתונים
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error("שגיאה בחיבור לבסיס הנתונים:", err.message);
    } else {
        console.log("מחובר בהצלחה לבסיס הנתונים SQLite.");
    }
});

// שינוי: הוספנו עמודה בשם user_email כדי לדעת מי העלה את החפץ
db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    price TEXT NOT NULL,
    description TEXT,
    user_email TEXT NOT NULL
)`);


// 1. שינוי: קבלת חפצים שמסוננים לפי המשתמש המחובר בלבד!
app.get('/api/items', (req, res) => {
    // השרת מקבל את האימייל של המשתמש כפרמטר בכתובת (Query Parameter)
    const userEmail = req.query.email;

    if (!userEmail) {
        return res.status(400).json({ error: "חובה לשלוח אימייל של משתמש כדי לקבל את החפצים שלו" });
    }

    // פקודת SQL עם WHERE שמחזירה רק את השורות ששייכות למשתמש הזה
    const sql = "SELECT * FROM items WHERE user_email = ?";
    db.all(sql, [userEmail], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// 2. שינוי: שמירת חפץ חדש יחד עם האימייל של המשתמש שהעלה אותו
app.post('/api/items', (req, res) => {
    const { title, price, description, user_email } = req.body;
    
    if (!title || !price || !user_email) {
        return res.status(400).json({ error: "חובה להזין שם, מחיר ואימייל משתמש" });
    }

    const sql = "INSERT INTO items (title, price, description, user_email) VALUES (?, ?, ?, ?)";
    db.run(sql, [title, price, description, user_email], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, title, price, description, user_email });
    });
});
//db.run("DELETE FROM items", (err) => {
   // if (!err) console.log("בסיס הנתונים אופס ונמחק בהצלחה!");
//});

app.listen(PORT, () => {
    console.log(`השרת פועל בהצלחה בכתובת: http://localhost:${PORT}`);
});