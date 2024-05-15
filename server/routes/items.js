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
});
//get specific list 
router.get("/:listId", (req, res) => {
  const requestedList= req.params.listId;
  const items = readItems();
  const list = items.find(item => item.id === requestedList );
  if (list) {
    return res.json(list);
  }
  return res.sendStatus(404);
});

//get all items for specific list id
router.get("/:listId/items", (req, res) => {
  const requestedId = req.params.listId;
  const items = readItems();
  const list = items.find(item => item.id === requestedId );
  if (list) {
    return res.json(list.items);
  }
  return res.sendStatus(404);
});

router.post("/:listId", (req, res) => {
  const newItem = {
    comment_id: uuid.v4(),
    list_id: req.params.listId,
    body: req.body.body
  }
  const items = readItems();
  const listIndex = items.findIndex(list => list.id === req.params.listId);
  items[listIndex].items.push(newItem);
  fs.writeFileSync("./data/items.json", JSON.stringify(items));
  return res.status(201).json(newItem);
});

router.delete("/:listId/:itemId", (req, res) => {
  const requestedListId = req.params.listId;
  const requestedItemId = req.params.itemId;
  const items = readItems();


  const listIndex = items.findIndex(list => list.id === requestedListId);
  if (listIndex === -1) {
    return res.status(404).json({ error: 'List not found' });
  }

  const itemIndex = items[listIndex].items.findIndex(item => item.comment_id === requestedItemId);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const deletedItem = items[listIndex].items.splice(itemIndex, 1)[0];
  fs.writeFileSync("./data/items.json", JSON.stringify(items));
  return res.json(deletedItem);
});



module.exports = router; 