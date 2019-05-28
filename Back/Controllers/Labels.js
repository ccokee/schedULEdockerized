const express = require('express')
var router = express.Router()
const Tasks = require('../Models/tasks')
const Checkpoints = require('../Models/checkpoints')
const Labels = require('../Models/labels')
const logger = require('../log')

router.post('/add', function (req, res) {
    Labels.create({
        name: req.body.name
    })
    .then(label => {
        res.send(label)
    })
    .catch(err => {
        logger.error(err)
        res.status(500).send('Unable to add label')
    })
})

router.post('/update', function (req, res) {
    Labels.findByPk(req.body.id)
    .then(label => {
        label.name = req.body.name
        label.save()
        .then(() => {
            res.send(label)
        })
        .catch(err => {
            logger.error(err)
            res.status(500).send('Unable to save update to label')
        })
    })
    .catch(err => {
        logger.error(err)
        res.status(500).send('Unable to find label')
    })
})

router.post('/delete', function (req, res) {
    Labels.findByPk(req.body.id)
    .then(label => {
        res.send(label.destroy())
    })
    .catch(err => {
        logger.error(err)
        res.status(500).send('Unable to find label')
    })
})

router.get('/list', function (req, res) {
    Labels.findAll()
    .then(labels => {
        res.send(labels)
    })
    .catch(err => {
        logger.error(err)
        res.status(500).send('Unable to find labels')
    })
})

router.get('/list/:taskid', function (req, res) {
    Tasks.findByPk(req.params.taskid)
    .then(task => {
        task.getLabels()
        .then(labels => {
            res.send(labels)
        })
        .catch(err => {
            logger.error(err)
            res.status(400).send('Unable to get labels from task ' + task.id)
        })
    })
    .catch(err => {
        logger.error(err)
        res.status(400).send('No task with that id')
    })
})

router.post('/assign_task', function (req, res) {
    Tasks.findByPk(req.body.id)
    .then(task => {
        Labels.findByPk(req.body.labelid)
        .then(label => {
            task.addLabel(label)
            .then(() => {
                res.send(task)
            })
            .catch(err => {
                logger.error(err)
                res.status(500).send('Unable to add label to task')
            })
        })
        .catch(err => {
            logger.error(err)
            res.status(400).send('Unable to get label with that id')
        })
    })
    .catch(err => {
        logger.error(err)
        res.status(400).send('Unable to get label with that id')
    })
})

router.post('/unassign_task', function (req, res) {
    Tasks.findByPk(req.body.id)
    .then(task => {
        Labels.findByPk(req.body.labelid)
        .then(label => {
            task.removeLabel(label)
            .then(() => {
                res.send(task)
            })
            .catch(err => {
                logger.error(err)
                res.status(500).send('Unable to remove label from task')
            })
        })
        .catch(err => {
            logger.error(err)
            res.status(400).send('Unable to get label with that id')
        })
    })
    .catch(err => {
        logger.error(err)
        res.status(400).send('Unable to get label with that id')
    })
})

router.post('/assign_checkpoint', function (req, res) {
    Checkpoints.findByPk(req.body.id)
    .then(checkpoint => {
        Labels.findByPk(req.body.labelid)
        .then(label => {
            checkpoint.addLabel(label)
            .then(() => {
                res.send(checkpoint)
            })
            .catch(err => {
                logger.error(err)
                res.status(500).send('Unable to add label to checkpoint')
            })
        })
        .catch(err => {
            logger.error(err)
            res.status(400).send('Unable to get label with that id')
        })
    })
    .catch(err => {
        logger.error(err)
        res.status(400).send('Unable to get checkpoint with that id')
    })
})

router.post('/unassign_checkpoint', function (req, res) {
    Checkpoints.findByPk(req.body.id)
    .then(checkpoint => {
        Labels.findByPk(req.body.labelid)
        .then(label => {
            checkpoint.removeLabel(label)
            .then(() => {
                res.send(checkpoint)
            })
            .catch(err => {
                logger.error(err)
                res.status(500).send('Unable to remove label from checkpoint')
            })
        })
        .catch(err => {
            logger.error(err)
            res.status(400).send('Unable to get label with that id')
        })
    })
    .catch(err => {
        logger.error(err)
        res.status(400).send('Unable to get label with that id')
    })
})


module.exports = router