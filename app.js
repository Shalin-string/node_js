const express = require("express");

const app = express();

app.get("/first", (req, res) => {
  console.log("First api called...");
  res.send({ name: "Shalin", age: 20 });
});

var users = [
  { id: 1, name: "Shalin", age: 21 },
  { id: 2, name: "jay", age: 22 },
  { id: 3, name: "vijay", age: 19 },
  { id: 4, name: "raj", age: 24 },
];

app.get("/users", (req, res) => {
  res.send({ message: "Fetch Successfully", data: users });
});

app.get("/usertable", (req, res) => {

  res.set("content-type", "text/html");
  res.send(`<table border="1">
            <tr>
                <td>id</td>
                <td>name</td>
                <td>age</td>
            </tr>
            
            ${users.map(u => `
                <tr>
                    <td>${u.id}</td>
                    <td>${u.name}</td>
                    <td>${u.age}</td>
                </tr>
            `).join("")}
            
        </table>`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Port stated on port ${PORT}`);
});
