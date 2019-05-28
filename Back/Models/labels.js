const sequelize = require('../sequelize')
const Sequelize = require('sequelize');

const Label = sequelize.define('label', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
  }, {
});

module.exports = Label