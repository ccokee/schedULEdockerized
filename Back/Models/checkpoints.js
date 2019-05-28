const sequelize = require('../sequelize')
const Sequelize = require('sequelize');
const Labels = require('./labels')
const Users = require('./users')

const Checkpoint = sequelize.define('checkpoint', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
  }, {
})

Checkpoint.belongsToMany(Users, {through: 'CheckpointsUsers'})
Checkpoint.belongsToMany(Labels, {through: 'LabelCheckpoints'});
module.exports = Checkpoint