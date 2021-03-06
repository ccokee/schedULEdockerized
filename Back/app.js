var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const sequelize = require('./sequelize')
const fileUpload = require('express-fileupload');
const Users = require('./Controllers/Users')
const Tasks = require('./Controllers/Tasks')
const Labels = require('./Controllers/Labels')
const Projects = require('./Controllers/Projects')
const passport = require('passport')
const UserModel = require('./Models/users')
app.use(function(req, res, next){
//CORS middleware
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next()
})
app.use(passport.initialize())
app.use(passport.session())
app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/users', Users)
app.use('/tasks', Tasks)
app.use('/projects', Projects)
app.use('/labels', Labels)
app.use('/imgs',express.static('imgs'));

app.get('/sanity/check', function(req,res){
    res.setHeader('Content-Type', 'application/json')
    res.send({ coke: "coKe says hello" })
})

console.log('Esperando por el contenedor de la bd');
setTimeout(console.log.bind(null, 'Espera finalizada'), 8000);

sequelize.sync() 

setTimeout(() => {
    UserModel.findByPk(1)
    .then(user => {
        if (user == null) {
            UserModel.create({
                username : "admin",
                password : "admin",
                email : "admin@admin.admin",
                isAdmin : true
            })
            .then(users => {
                console.log('*********************ADMIN AÑADIDO***********************') 
            })
        }else{
            console.log('*********************ADMIN YA EXISTE***********************')  
        }
    })
}, 1000)



app.listen(40000, function () {
    console.log('-- App started on port 40000-- ');
});