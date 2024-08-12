// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');

// const app = express();
// app.use(express.json());
// app.use(cors())
// const db = mysql.createConnection({
// host:"localhost",
// user:"root",
// password:"devansh",
// database:"newcards"
// })


// app.get("/",(req,res)=>{
//   const q = "SELECT * FROM card3"
//   db.query(q, (err, result) => {
//     if (err)return res.json(err)
      
//     return res.json(result);
// });
// })
// app.post("/dashboard",(req,res)=>{
// const q = "INSERT INTO card3(`id`,`question`,`answer`)VALUES(?)"
// const values = ["2","hi","bye"]
// db.query(q,[values],(err,data)=>{
//   if(err)return res.json(err)
//     return res.json(data);
// })
// })

// app.listen(8800,()=>{
//   console.log('Server is running on port 8800');
// });

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "devansh",
  database: "newcards"
});

// Read all cards
app.get("/", (req, res) => {
  const q = "SELECT * FROM card3";
  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});
app.get("/dashboard", (req, res) => {
  const q = "SELECT * FROM card3";
  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// Create a new card
app.post("/dashboard", (req, res) => {
  console.log("Received data:", req.body); // Log incoming data

  const q = "INSERT INTO card3(`question`, `answer`) VALUES (?, ?)";
  const values = [req.body.question, req.body.answer];
  
  console.log("Query to execute:", q, values); // Log the query and values

  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Error inserting data:", err); // Log any errors
      return res.json(err);
    }
    return res.json("Card has been created successfully.");
  });
});


// Update a card
app.put("/dashboard/:id", (req, res) => {
  const cardId = req.params.id;
  const q = "UPDATE card3 SET `question`=?, `answer`=? WHERE id = ?";
  
  const values = [req.body.question, req.body.answer, cardId];
  
  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Card has been updated successfully.");
  });
});

// Delete a card
app.delete("/dashboard/:id", (req, res) => {
  const cardId = req.params.id;
  const q = "DELETE FROM card3 WHERE id = ?";

  db.query(q, [cardId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Card has been deleted successfully.");
  });
});

app.listen(8800, () => {
  console.log('Server is running on port 8800');
});