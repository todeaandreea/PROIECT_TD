module.exports = app => {
  const stocks_cont = require("../controllers/stock.controller.js");

  let router = require("express").Router();

  // Create a new Stock
  router.post("/", stocks_cont.create);

  // Retrieve all stocks
  router.get("/", stocks_cont.findAll);
  

  // Retrieve a single Stock with id
  router.get("/:id", stocks_cont.findOne);

  // Update a Stock with id
  router.put("/:id", stocks_cont.update);

  // Delete a Stock with id
  router.delete("/:id", stocks_cont.delete);

  // Delete all stocks
  router.delete("/", stocks_cont.deleteAll);

  app.use("/api/stocks", router);
};
