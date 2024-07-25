const db = require("../config/connection");

async function findByFlashcardId(flashcard_id) {
    const [[flashcard]] = await db.query(
        `SELECT * FROM flashcard WHERE flashcard_id=?`,
        flashcard_id
    );
    return flashcard;
}

async function getAllFlashcards(set_id) {
    const [flashcards] = await db.query(
        `SELECT * FROM flashcard WHERE set_id=?`,
        set_id
    );
    return flashcards
}

async function createFlashcard(set_id, question, answer) {
    const [result] = await db.query(
        `INSERT INTO flashcard (set_id, question, answer) VALUES (?, ?, ?)`, [
            set_id, question, answer
    ])
    const newFlashcardId = result.insertId
    return findByFlashcardId(newFlashcardId)
}

async function updateFlashcard(flashcard_id, question, answer) {
    await db.query(
        `UPDATE flashcard SET question=?, answer=? WHERE flashcard_id=?`, [
            question, answer, flashcard_id
    ]);
}

async function deleteFlashcard(flashcard_id) {
    await db.query(
        `DELETE FROM flashcard WHERE flashcard_id=?`,
        flashcard_id
    )
}

module.exports = {
    findByFlashcardId,
    getAllFlashcards,
    createFlashcard,
    updateFlashcard,
    deleteFlashcard
}