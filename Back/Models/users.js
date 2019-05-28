const sequelize = require('../sequelize')
const Sequelize = require('sequelize');
const crypto = require('crypto')
const Projects = require('./projects')
const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      set(value) {
        const hash = crypto.createHmac('sha256', value).digest('hex');
        this.setDataValue('password', hash);
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    token: {
      type: Sequelize.STRING
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    avatar: {
      type: Sequelize.STRING,
    }
  }, {
});

User.belongsToMany(Projects, {through: 'UsersProject'});
Projects.belongsToMany(User, {through: 'UsersProject'})
module.exports = User