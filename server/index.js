const express = require("express");
const itemRoutes = require("./routes/items");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || process.argv[2] || 8080;
const cors = require('cors')

app.use(cors());
app.use("/", itemRoutes);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
});
