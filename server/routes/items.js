const fs = require("fs");
const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const readItems = () => {
  const listData = fs.readFileSync("./data/items.json");
  const parsedData = JSON.parse(listData);
  return parsedData;
};

router.get("/", (req, res) => {
  const items = readItems();
  res.json(items);
  console.log(items);
});

router.get("/:listname", (req, res) => {
  const requestedList= req.params.listname;
  const items = readItems();
  const list = items.filter(item => item.listname === requestedList );
  if (list) {
    res.json(list);
  }
  res.sendStatus(404);
});

router.get("/:id", (req, res) => {
  const requestedId = req.params.id;
  const items = readItems();
  const item = items.find(item => item.id === requestedId );
  console.log(item.id);
  if (item) {
    res.json(item);
  }
  res.sendStatus(404);
});

router.post("/", (req, res) => {
  const newItem = {
    id: uuid.v4(),
    listname: req.body.listname,
    copy: req.body.copy
  }
  const items = readItems();
  items.push(newItem);
  fs.writeFileSync("./data/items.json", JSON.stringify(items));
  res.status(201).json(newItem);
});

router.delete("/:id", (req, res) => {
  const requestedId = req.params.id
  const items = readItems();
  const itemDelete = items.find((item) => item.id === requestedId)
  const itemIndex = items.indexOf(itemDelete)
  items.splice(itemIndex, 1)
  fs.writeFileSync("./data/items.json", JSON.stringify(items));
  res.json(itemDelete)
});



module.exports = router; 