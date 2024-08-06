const db = require("../config/connection");

async function findSetById(set_id) {
    const [[set]] = await db.query(
        `SELECT * FROM study_sets WHERE set_id=?`,
        [set_id]
    );
    return set
}

async function getAllSets(user_id) {
    const [sets] = await db.query(
        `SELECT * FROM study_sets WHERE user_id=?`,
        [user_id]
    )
    return sets;
}

async function createSet(title, description, user_id) {
    const [result] = await db.query(
        `INSERT INTO study_sets (title, description, user_id) VALUES (?, ?, ?)`,
        [title, description, user_id]
    );
    const newSetId = result.insertId
    return findSetById(newSetId)
}

async function updateSet(set_id, title, description) {
    await db.query(
        `UPDATE study_sets SET title=?, description=? WHERE set_id=?`,
        [title, description, set_id]
    );
}

async function deleteSet(set_id) {
    await db.query(
        `DELETE FROM study_sets WHERE set_id=?`,
        [set_id]
    );
}

module.exports = {
    findSetById,
    getAllSets,
    createSet,
    updateSet,
    deleteSet,
};