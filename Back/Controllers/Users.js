const express = require('express');
var router = express.Router();
const User = require('../Models/users');
const log = require('../log');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const crypto = require('crypto');
var jwt = require('jsonwebtoken');
const passport = require('passport')
const BearerStrategy = require('passport-http-bearer').Strategy
const Projects = require('../Models/projects')

passport.use(new BearerStrategy(function(token, done) {
      User.findOne({ where: {
          token: {
              [Op.eq]: token
          }
      } })
      .then(user => {
        if (!user) { return done(null, false) }

        var decoded = jwt.verify(user.token, user.password);
        if(new Date().getTime() > decoded.exp * 1000) {
            return done(null, false)
        }
        return done(null, user, { scope: 'all' });
      })
      .catch(err => {
        if (err) { return done(err); }
      })
    }
));
// User/add Añadir usuario
router.post('/add', function(req, res){
    User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })
    .then(user => {
        let token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60)}, user.password, { algorithm: 'HS256'});
        user.token = token
        user.save()
        res.send(user.token)
    })
    .catch(err => {
        console.log(err)
        res.status(400).send('Bad request')
    })
});

router.post('/get', function(req, res){
    const hash = crypto.createHmac('sha256', req.body.password).digest('hex');

    User.findAll({
        where:{
            [Op.and]: [
                {
                    password: {
                        [Op.eq]: hash
                    }
                },{
                    email: {
                        [Op.eq]: req.body.email
                    }
                }
            ]
        },
        include: [{
            model: Projects
        }]
    })
    .then(users => {
        if (users.length > 0) {
            let user = users[0]
            user.token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60)}, users[0].password, { algorithm: 'HS256'});
            user.save()
            res.json(user)
        }
        else {
            res.status(400).send('Invalid email or password')
        }
    })
});

router.post('/togglestatus', passport.authenticate('bearer', { session: false }), function(req, res){
    User.findOne({
        where:{
            id: {
                [Op.eq]: req.body.id
            }
        }
    })
    .then(user => {
        user.isAdmin = !user.isAdmin
        user.save()
        res.json(user)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send()
    })
});

// User/update Modificar password del usuario
router.post('/updatepassword', passport.authenticate('bearer', { session: false }), function(req, res){
    User.update({
        password: req.body.password,
      }, {
        where: {
          email:{
            [Op.eq]: req.user.email
          }
        }
    })
    .then(() => {
        res.send('ok')
    })
    .catch(err => {
        console.log(err)
        res.status(500).send('Error')
    })
});

router.get('/list', passport.authenticate('bearer', { session: false }), function(req, res){
    User.findAll()
    .then((users) => {
        res.json(users)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send('Error listing all users ')
    })
});

// User/delete Borrar usuario
router.post('/delete',passport.authenticate('bearer', { session: false }), function(req, res){
    const hash = crypto.createHmac('sha256', req.user.password).digest('hex');

    User.destroy({
        where:{
            [Op.and]: [
                {
                    password: {
                        [Op.eq]: hash
                    }
                },{
                    email: {
                        [Op.eq]: req.user.email
                    }
                }
            ]
        }
    })
    .then(() => {
        res.send('ok')
    })
    .catch(err => {
        console.log(err)
        res.status(500).send('Internal error')
    })
})

router.post('/upload', passport.authenticate('bearer', { session: false }), function(req, res) {
    if (Object.keys(req.files).length == 0) {
      return res.status(400).send('No files were uploaded.');
    }
    
    let avatar = req.files.file;
    
    avatar.mv(__dirname +'/../imgs/'+avatar.name+'.jpg', function(err) {
        if (err)
            return res.status(500).send(err)
        
        User.findOne({
            where:{
                username: {
                    [Op.eq]: req.user.username
                }
            }
        })
        .then(async user => {
            user.avatar = process.env.PROXY_HOST_PORT + '/imgs/'+avatar.name+'.jpg'
            await user.save()
            res.send('/imgs/' + avatar.name + '.jpg');
        })
        .catch(err => {
            console.log(err)
            res.status(500).send()
        })
    });
});

router.get('/avatar/:username',passport.authenticate('bearer', { session: false }), function(req, res) {
    User.findOne({
        where:{
            username: {
                [Op.eq]: req.params.username
            }
        }
    })
    .then(user => {
        res.send(user.avatar)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send()
    })
});

exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false })
module.exports = router