const express = require('express')
var router = express.Router()
const Tasks = require('../Models/tasks')
const UsersModel = require('../Models/users')
const Checkpoints = require('../Models/checkpoints')
const Labels = require('../Models/labels')
const logger = require('../log')
const Users = require('./Users')
const Projects = require('../Models/projects')

const passport = require('passport')

router.post('/add', passport.authenticate('bearer', { session: false }), async function(req,res){
    try {
        let task = await Tasks.create({
            name: req.body.name,
            description: req.body.description,
            weight: req.body.weight,
            status: req.body.status
        })
        
        let project = await Projects.findByPk(req.body.projectid)
        project.addTask(task)
        res.send(task)
    }
    catch(err) {
        logger.error(err)
        console.log(err)
        res.status(500).send('Unable to create task')
    }
})

router.post('/update', passport.authenticate('bearer', { session: false }), async function(req,res){
    try {
        let task = await Tasks.findByPk(req.body.id)
        for (let key in req.body) {
            task[key] = req.body[key]
        }
        await task.save()
        res.json(task)
    }
    catch (err) {
        logger.error(err)
        res.status(500).send('Unable to update task')
    }
})

router.post('/delete', passport.authenticate('bearer', { session: false }), async function(req,res){
    try {
        let task = await Tasks.findByPk(req.body.id)
        task.destroy()
        res.send()
    }
    catch (err) {
        logger.error(err)
        res.status(400).send('Unable to destroy task')
    }
})

router.post('/checkpoints/add',passport.authenticate('bearer', { session: false }), async function(req,res){
    try {
        let checkpoint = await Checkpoints.create({
            name: req.body.name,
            status: req.body.status
        })
        
        let task = await Tasks.findByPk(req.body.taskid)
        await task.addCheckpoint(checkpoint)
        res.send(checkpoint)
    }
    catch (err) {
        logger.error(err)
        res.status(500).send('Unable to create checkpoint')
    }
})

router.post('/checkpoints/update',passport.authenticate('bearer', { session: false }), async function(req,res){
    try {
        let checkpoint = await Checkpoints.findByPk(req.body.id)
        for (let key in req.body) {
            checkpoint[key] = req.body[key]
        }
        
        await checkpoint.save()
        res.send(checkpoint)
    }
    catch (err) {
        logger.error(err)
        res.status(400).send('Unable to update checkpoint')
    }
})

router.post('/checkpoints/delete',passport.authenticate('bearer', { session: false }), async function(req,res){
    try {
        let checkpoint = await Checkpoints.findByPk(req.body.id)
        checkpoint.destroy()
        res.send()
    }
    catch (err) {
        logger.error(err)
        res.status(500).send('Unable to delete checkpoint')
    }
})

router.get('/:id',passport.authenticate('bearer', { session: false }), async function(req, res) {
    try {
        let task = await Tasks.findByPk(req.params.id, {
            include: [{
                model: UsersModel
            },
            {
                model: Checkpoints,
                include: [
                    { model: UsersModel },
                    { model: Labels }
                ]
            },
            {
                model: Labels
            }]
        })
        res.json(task)        
    }
    catch (err) {
        logger.error(err)
        res.status(500).send('Unable to get tasks')
    }
})

router.post('/assign_user',passport.authenticate('bearer', { session: false }), async function (req, res) {
    try {
        let task = await Tasks.findByPk(req.body.task_id)
        let user = await UsersModel.findByPk(req.body.user_id)
        await task.addUser(user)
        res.send(task)
    }
    catch (err) {
        logger.error(err)
        res.status(500).send('Unable to assign user to task')
    }
})

router.post('/assign_project',passport.authenticate('bearer', { session: false }), async function (req, res) {
    try {
        let task = await Tasks.findByPk(req.body.task_id)
        let user = await Projects.findByPk(req.body.project_id)
        await task.addProject(user)
        res.send(task)
    }
    catch (err) {
        logger.error(err)
        res.status(500).send('Unable to assign user to task')
    }
})

router.post('/assign_weight',passport.authenticate('bearer', { session: false }), async function (req, res) {
    try {
        let task = await Tasks.findByPk(req.body.task_id)
        task.weight = req.body.weight
        await task.save()
        res.send(task)
    }
    catch (err) {
        logger.error(err)
        res.status(500).send('Unable to set weight')
    }
})

router.post('/assign_real_weight',passport.authenticate('bearer', { session: false }), async function (req, res) {
    try {
        let task = await Tasks.findByPk(req.body.task_id)
        task.real_weight = req.body.real_weight
        await task.save()
        res.send(task)
    }
    catch (err) {
        logger.error(err)
        res.status(500).send('Unable to set real weight')
    }
})

router.post('/unassign_user',passport.authenticate('bearer', { session: false }), async function (req, res) {
    try {
        let task = await Tasks.findByPk(req.body.task_id)
        let user = await UsersModel.findByPk(req.body.user_id)
        await task.removeUser(user)
        res.send(task)
    }
    catch (err) {
        logger.error(err)
        res.status(500).send('Unable to unassign user to task')
    }
})

router.post('/checkpoints/assign_user',passport.authenticate('bearer', { session: false }), async function (req, res) {
    try {
        let checkpoint = await Checkpoints.findByPk(req.body.checkpoint_id)
        let user = await UsersModel.findByPk(req.body.user_id)
        await checkpoint.addUser(user)
        res.send(checkpoint)
    }
    catch (err) {
        logger.error(err)
        console.log(err)
        res.status(500).send('Unable to assign user to checkpoint')
    }
})

router.post('/checkpoints/unassign_user',passport.authenticate('bearer', { session: false }), async function (req, res) {
    try {
        let checkpoint = await Checkpoints.findByPk(req.body.checkpoint_id)
        let user = await UsersModel.findByPk(req.body.user_id)
        await checkpoint.removeUser(user)
        res.send(checkpoint)
    }
    catch (err) {
        logger.error(err)
        res.status(500).send('Unable to unassign user to checkpoint')
    }
})

module.exports = router