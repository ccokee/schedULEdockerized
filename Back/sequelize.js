const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize( process.env.MYSQL_DATABASE , process.env.MYSQL_USER , process.env.MYSQL_PASSWORD , {
  host: process.env.DATABASE_HOST,
  dialect: 'mysql',
  define: {
    charset: 'utf8',
    timestamps: true
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize