module.exports = (sequelize, Sequelize) => {
  const HoneyStock = sequelize.define("HoneyStocks", {

    typeOfHoney: {
      type: Sequelize.STRING
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    harvestDate: {
      type: Sequelize.DATE
    },
    harvestLocation: {
      type: Sequelize.STRING
    },
    purityLevel: {
      type: Sequelize.INTEGER
    },
    producer: {
      type: Sequelize.STRING
    },
    pricePerKilogram: {
      type: Sequelize.DECIMAL
    },
    expirationDate: {
      type: Sequelize.DATE
    },
    storageLocation: {
      type: Sequelize.STRING
    },
    isAvailable: {
      type: Sequelize.BOOLEAN,

    }


  });

  return HoneyStock;
};