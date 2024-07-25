const { Flashcard } = require('../models')

async function createFlashcard(req, res) {
    try {
        const { set_id } = req.params
        const { question, answer } = req.body;

        if (!question || !answer)
            return res.status(400).send("question and answer required")

        const newFlashcard = await Flashcard.create(set_id, question, answer)

        if (!newFlashcard)
            return res.status(500).send("failed creation of flashcard")

        res.status(201).json(newFlashcard)
    } catch (err) {
        res.status(500).send(`failed to create flashcard: ${err.message}`)
    }
}

async function getAllFlashcards(req, res) {
    try {
        const { set_id } = req.params

        if (!set_id)
            return res.status(400).send('set not found')

        const flashcards = await Flashcard.getAllFlashcards(set_id)

        res.json(flashcards)
    } catch (err) {
        res.status(500).send(`failed to get flashcards: ${err.message}`)
    }
}

async function updateFlashcard(req, res) {
    try {
        const { flashcard_id } = req.params
        const { question, answer } = req.body
        
        if (!question || !answer)
            return res.status(400).send('question and answer required')

        await Flashcard.updateFlashcard(flashcard_id, question, answer)

        res.status(200).send('flashcard updated')
    } catch (err) {
        res.status(500).send(`faled to update: ${err.message}`)
    }
}

async function deleteFlashcard(req, res) {
    try {
        const { flashcard_id } = req.params

        if (!flashcard_id)
            return res.status(400).send('flashcard not found')
        await Flashcard.deleteById(flashcard_id)
        res.status(200).send('flashcard deleted')
    } catch (err) {
        res.status(500).send(`failed to delete: ${err.message}`)
    }
}

module.exports = {
    createFlashcard,
    getAllFlashcards,
    updateFlashcard,
    deleteFlashcard
}