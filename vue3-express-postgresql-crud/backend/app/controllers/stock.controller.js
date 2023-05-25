const db = require("../models");
const Honey = db.HoneyStocks;
const Op = db.Sequelize.Op;

// Create and Save a new HoneyStock
exports.create = (req, res) => {
  // Validate request
  if (!req.body.typeOfHoney || !req.body.quantity || !req.body.harvestDate || !req.body.harvestLocation || !req.body.purityLevel || !req.body.producer || !req.body.pricePerKilogram || !req.body.expirationDate || !req.body.storageLocation || !req.body.isAvailable) {
    res.status(400).send({
      message: "All fields are required!"
    });
    return;
  }

  // Create a HoneyStock
  const honeyStock = {
    typeOfHoney: req.body.typeOfHoney,
    quantity: req.body.quantity,
    harvestDate: req.body.harvestDate,
    harvestLocation: req.body.harvestLocation,
    purityLevel: req.body.purityLevel,
    producer: req.body.producer,
    pricePerKilogram: req.body.pricePerKilogram,
    expirationDate: req.body.expirationDate,
    storageLocation: req.body.storageLocation,
    isAvailable: req.body.isAvailable
  };

  // Save HoneyStock in the database
  Honey.create(honeyStock)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the HoneyStock."
      });
    });
};


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const typeOfHoney = req.query.typeOfHoney;

  let condition = typeOfHoney ? { typeOfHoney: { [Op.iLike]: `%${typeOfHoney}%` } } : null;

  Honey.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};



// Find a single HoneyStock with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Honey.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find HoneyStock with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving HoneyStock with id=" + id
      });
    });
};

// Update a HoneyStock by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Honey.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "HoneyStock was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update HoneyStock with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating HoneyStock with id=" + id
      });
    });
};

// Delete a HoneyStock with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Honey.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "HoneyStock was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete HoneyStock with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Honey.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published HoneyStock
exports.findAll = (req, res) => {
  Honey.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single HoneyStock with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Honey.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving HoneyStock with id=" + id
        });
      });
};
