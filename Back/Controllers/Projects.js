const express = require('express')
var router = express.Router()
const Users = require('../Models/users')
const Labels = require('../Models/labels')
const logger = require('../log')
const Projects = require('../Models/projects')
const Tasks = require('../Models/tasks')

const passport = require('passport')

router.post('/add', passport.authenticate('bearer', { session: false }), async function(req,res){
    try {
        console.log(req.body)
        let project = await Projects.create({
            name: req.body.name
        })
        
        res.send(project)
    }
    catch(err) {
        logger.error(err)
        console.log(err)
        res.status(500).send('Unable to create project')
    }
})

router.post('/update', passport.authenticate('bearer', { session: false }), async function(req,res){
    try {
        let project = await Projects.findByPk(req.body.id)
        for (let key in req.body) {
            if (key != 'id') {
                project[key] = req.body[key]
            }
        }
        await project.save()
        res.json(project)
    }
    catch (err) {
        logger.error(err)
        console.log(err)
        res.status(500).send('Unable to update project')
    }
})

router.post('/delete', passport.authenticate('bearer', { session: false }), async function(req,res){
    try {
        let task = await Projects.findByPk(req.body.id)
        task.destroy()
        res.send()
    }
    catch (err) {
        logger.error(err)
        res.status(400).send('Unable to destroy project')
    }
})

router.get('/:id', passport.authenticate('bearer', { session: false }), async function(req,res) {
    try {
        let project = await Projects.findByPk(req.params.id, {
            include: [
              {
                model: Tasks,
                include: [{
                    model: Labels
                },
                {
                    model: Users
                }]
              },
              {
                model: Users
              }
            ],
        })
        res.json(project)
    }
    catch (err) {
        logger.error(err)
        console.log(err)
        res.status(400).send('Unable to retrieeve project')
    }
})


router.post('/assign_user', passport.authenticate('bearer', { session: false }), async function(req,res) {
    try {
        let project = await Projects.findByPk(req.body.projectid)
        let user = await Users.findByPk(req.body.userid)
        project.addUser(user)
        res.json(project)
    }
    catch (err) {
        logger.error(err)
        console.log(err)
        res.status(400).send('Unable to retrieeve project')
    }
})

router.post('/unassign_user', passport.authenticate('bearer', { session: false }), async function(req,res) {
    try {
        let project = await Projects.findByPk(req.body.projectid)
        let user = await Users.findByPk(req.body.userid)
        project.removeUser(user)
        res.json(project)
    }
    catch (err) {
        logger.error(err)
        console.log(err)
        res.status(400).send('Unable to retrieeve project')
    }
})
module.exports = router