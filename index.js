const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "goodreads.db");
const app = express();
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running At http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
  }
};

initializeDBAndServer();

//API GET BOOKS FROM BOOK TABLE

app.get("/books/", async (request, response) => {
  const getBooksQuery = `
    SELECT
    * 
    FROM book 
    ORDER BY 
    book_id;`;

  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});
