const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: "root",
  password: "root123",
  database: "adventure"
});

db.connect();

app.get("/", (req, res) => {
  res.send(`
  <html>
  <head>
  <title>Adventure World</title>

  <style>

  body{
      margin:0;
      background:linear-gradient(#020024,#090979,#00d4ff);
      color:white;
      text-align:center;
      font-family:Arial;
      overflow:hidden;
  }

  h1{
      margin-top:80px;
      font-size:60px;
  }

  input{
      padding:15px;
      width:300px;
      border-radius:20px;
      border:none;
  }

  button{
      padding:15px 30px;
      border:none;
      border-radius:20px;
      background:gold;
      font-size:18px;
      cursor:pointer;
  }

  .star{
      position:absolute;
      color:white;
      animation: float 5s infinite;
  }

  @keyframes float{
      0%{transform:translateY(0);}
      50%{transform:translateY(-20px);}
      100%{transform:translateY(0);}
  }

  </style>
  </head>

  <body>

  <h1>🌌 Magical Adventure World</h1>

  <p>Enter your explorer name</p>

  <form action="/join" method="POST">

  <input name="name" placeholder="Explorer Name">

  <br><br>

  <button>
  ✨ Enter The Magical World
  </button>

  </form>

  </body>
  </html>
  `);
});

app.post("/join",(req,res)=>{

    const name=req.body.name;

    db.query(
        "INSERT INTO explorers(name) VALUES(?)",
        [name]
    );

    res.send(`

    <html>

    <body style="
    background:black;
    color:white;
    text-align:center;
    font-family:Arial;
    ">

    <h1>🧙 Welcome Brave Explorer ${name}</h1>

    <h2>🐉 Dragon Valley Has Opened</h2>

    <h2>🏰 Crystal Castle Unlocked</h2>

    <h2>🏹 Archer Forest Unlocked</h2>

    <h2>🌋 Fire Mountain Unlocked</h2>

    <h1 style="color:gold">
    LEGENDARY EXPLORER
    </h1>

    </body>

    </html>

    `);

});

app.listen(3000,()=>{
console.log("Adventure World Running");
});
