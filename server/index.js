const express = require("express");
const itemRoutes = require("./routes/items");
const app = express();
app.use(express.json());

app.use("/", itemRoutes);

app.listen(8080, () => {
  console.log("Server is running")
});
