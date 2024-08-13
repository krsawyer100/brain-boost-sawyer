const { Flashcard } = require('../models')

async function createFlashcard(req, res) {
    try {
        const { set_id } = req.params
        const { term, answer } = req.body

        if(!term || !answer) {
            return res.status(400).send('Term and answer required')
        }
        const newFlashcard = await Flashcard.createFlashcard(set_id, term, answer)

        if(!newFlashcard) {
            return res.status(500).send('Failed to create new flashcard')
        }

        return { newFlashcard }

    } catch (err) {
        res.status(500).send(`Failed to create flashcard: ${err.message}`)
    }
}

async function getAllFlashcards(req, res) {
    try {
        const { set_id } = req.params.id

        if (!set_id) {
            return res.status(400).send('Set not found')
        }

        const flashcards = await Flashcard.getAllFlashcards(set_id)

        return { flashcards }

    } catch (err) {
        res.status(500).send(`Failed to get flashcards: ${err.message}`)
    }
}

async function updateFlashcard(req, res) {
    try {
        const flashcard_id = req.body.id
        const set_id = req.params.id
        const { term, answer } = req.body

        console.log(req.params)
        
        if (!term || !answer) {
            return res.status(400).send('Term and answer required')
        }

        await Flashcard.updateFlashcard(set_id, flashcard_id, term, answer)

        res.status(200).send('Flashcard updated')
    } catch (err) {
        res.status(500).send(`Failed to update: ${err.message}`)
    }
}

async function deleteFlashcard(req, res) {
    try {
        const set_id = req.params.id
        const flashcard_id = req.params.flashcard_id
        console.log("set id: " + set_id)
        console.log("flashcard number: " + flashcard_id)

        if (!flashcard_id) {
            return res.status(400).send('Flashcard not found')
        }

        await Flashcard.deleteFlashcard(set_id, flashcard_id)

        res.status(200).redirect(`/sets/${set_id}`)
    } catch (err) {
        res.status(500).send(`Failed to delete: ${err.message}`)
    }
}

module.exports = {
    createFlashcard,
    getAllFlashcards,
    updateFlashcard,
    deleteFlashcard,
}