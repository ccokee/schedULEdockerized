const sequelize = require('../sequelize')
const Sequelize = require('sequelize');
const Users = require('./users')
const Checkpoints = require('./checkpoints')
const Projects = require('./projects')
const Labels = require('./labels')
const Task = sequelize.define('task', {
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
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            len: [0, 2000]
        }
    },
    weight: {
        type: Sequelize.FLOAT,
        validate: {
            min: 0
        }
    },
    real_weight: {
        type: Sequelize.FLOAT,
        validate: {
            min: 0
        }
    }
  }, {
});

Task.belongsTo(Projects)
Task.belongsToMany(Users, {through: 'TaskUsers'});
Projects.hasMany(Task)
Task.hasMany(Checkpoints)
Task.belongsToMany(Labels, {through: 'LabelTasks'})
module.exports = Task