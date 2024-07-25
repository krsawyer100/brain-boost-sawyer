const { StudySet } = require('../models')

async function createSet(req, res) {
    try {
        const { title, description } = req.body;

        if (!title)
            return res.status(400).send('title is required')
        const newSet = await StudySet.createSet(title, description)

        if (!newSet)
            return res.status(500).send('failed to create study set')
        res.status(201).json(newSet)
    } catch (err) {
        res.status(500).send(`failed to create: ${err.message}`)
    }
}

async function getAllSets(req, res) {
    try {
        const studySets = await StudySet.getAllSets()
        res.json(studySets)
    } catch (err) {
        res.status(500).send(`failed to grab: ${err.message}`)
    }
}

async function updateSet(req, res) {
    try {
        const { set_id } = req.params
        const { title, description } = req.body;

        if (!title)
            return res.status(400).send("title required")

        await StudySet.updateSet(set_id, title, description)
        res.status(200).send("set updated")
    } catch (err) {
        res.status(500).send(`Failed to update study set: ${err.message}`);
    }
}

async function deleteSet(req, res) {
    try {
        const { set_id } = req.params;

        if (!set_id)
            return res.status(400).send('set not found')
        await StudySet.deleteSet(set_id)
        res.status(200).send('set deleted')
    } catch (err) {
        res.status(500).send(`failed to delete: ${err.message}`)
    }
}

module.exports = {
    createSet,
    getAllSets,
    updateSet,
    deleteSet
}