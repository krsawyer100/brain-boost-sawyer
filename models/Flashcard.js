const db = require("../config/connection");

async function findFlashcardById(flashcard_id) {
    const [[flashcard]] = await db.query(
        `SELECT * FROM flashcards WHERE flashcard_id=?`,
        [flashcard_id]
    );
    return flashcard
}

async function getAllFlashcards(set_id) {
    const [flashcards] = await db.query(
        `SELECT * FROM flashcards WHERE set_id=?`,
        [set_id]
    );
    console.log(flashcards)
    return flashcards
}

async function createFlashcard(set_id, term, answer) {
    const [flashcardNumber] = await db.query(
        `SELECT COALESCE(MAX(flashcard_id), 0) + 1 AS nextFlashcardId FROM flashcards WHERE set_id=?`,
        [set_id]
    )

    const flashcardId = flashcardNumber[0].nextFlashcardId

    const [result] = await db.query(
        `INSERT INTO flashcards (flashcard_id, set_id, term, answer) VALUES (?, ?, ?, ?)`,
        [flashcardId, set_id, term, answer]
    );
    
    const newFlashcardId = result.flashcard_id
    return findFlashcardById(newFlashcardId)
}

async function updateFlashcard(set_id, flashcard_id, term, answer) {

    const [existingFlashcard] = await db.query(
        `SELECT * FROM flashcards WHERE set_id=? AND flashcard_id = ?`,
        [set_id, flashcard_id]
    )

    if (existingFlashcard) {
        await db.query(
            `UPDATE flashcards SET term=?, answer=? WHERE set_id=? AND flashcard_id=?`,
            [term, answer, set_id, flashcard_id]
        )
    } 
    if (existingFlashcard.length === 0) {
        console.log("New flash update")
        await db.query(
            `INSERT INTO flashcards (flashcard_id, set_id, term, answer) VALUES (?, ?, ?, ?)`,
            [flashcard_id, set_id, term, answer]
        )
    }
}

async function deleteFlashcard(flashcard_id) {
    await db.query(
        `DELETE FROM flashcards WHERE flashcard_id=?`,
        flashcard_id
    );
}

module.exports = {
    findFlashcardById,
    getAllFlashcards,
    createFlashcard,
    updateFlashcard,
    deleteFlashcard,
}