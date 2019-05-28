const sequelize = require('../sequelize')
const Sequelize = require('sequelize');

const Projects = sequelize.define('project', {
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

module.exports = Projects