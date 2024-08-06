const { StudySet, Flashcard } = require('../models');

async function createSet(req, res) {
    try {
        const { title, description, term, answer } = req.body
        const user_id = req.session.user_id

        if (!title) {
            return res.redirect("/sets/create?error=Title is required");
        }

        const studySet = await StudySet.createSet(title, description, user_id)

        if (!studySet) {
            return res.redirect("/sets/create?error=Failed to create set");
        }

        const set_id = studySet.set_id

        if (!Array.isArray(term)) {
            return res.redirect("/sets/create?error=At least two flashcards required");
        } else {
            for (let i = 0; i < term.length; i++) {
                const newFlashcard = await Flashcard.createFlashcard(set_id, term[i], answer[i])
                console.log(newFlashcard)
            }
        }
        res.status(201).redirect(`/sets/${set_id}`)
        return studySet
    }  catch (err) {
        res.status(500).send(`Failed to create set and flashcards: ${err.message}`)
    }
}

async function getAllSets(req, res) {
    try {
        const user_id = req.session.user_id
        const studySets = await StudySet.getAllSets(user_id)
        console.log(user_id)
        return studySets
    } catch (err) {
        res.status(500).send(`Failed to grab sets: ${err.message}`)
    }
}

async function updateSet(req, res) {
    try {
        const set_id = req.params.id
        const { title, description, term, answer, flashcard_id } = req.body

        if (!title) {
            return res.status(400).send('Title is required')
        }

        await StudySet.updateSet(set_id, title, description)

        if (!Array.isArray(term)) {
            return res.redirect("/sets/create?error=At least two flashcards required");
        } else {
            for (let i = 0; i < term.length; i++) {
                const newFlashcard = await Flashcard.updateFlashcard(set_id, flashcard_id[i], term[i], answer[i])
                console.log(newFlashcard)
            }
        }

        res.status(200).redirect(`/sets/${set_id}`)
    } catch (err) {
        res.status(500).send(`Failed to update study set: ${err.message}`)
    }
}

async function deleteSet(req, res) {
    try {
        const set_id = req.params.id

        if (!set_id) {
            return res.status(400).send('Set not found')
        }

        await StudySet.deleteSet(set_id)
        res.status(200).redirect('/sets')
    } catch (err) {
        res.status(500).send(`Failed to delete set: ${err.message}`)
    }
}

async function getSetAndFlashcards(req, res) {
    try {
        const set_id = req.params.id
        console.log(`Fetching set ID: ${set_id}`);
        const studySet = await StudySet.findSetById(set_id)
        const flashcards = await Flashcard.getAllFlashcards(set_id)

        if (!studySet) {
            return res.status(400).send('Study set not found')
        }
        return { studySet, flashcards }
    } catch (err) {
        res.status(500).send(console.log(`Failed to get study set: ${err.message}`))
    }
}

module.exports = {
    createSet,
    getAllSets,
    updateSet,
    deleteSet,
    getSetAndFlashcards
}