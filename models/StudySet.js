const db = require("../config/connection");

async function findBySetId(set_id) {
    const [[set]] = await db.query(
        `SELECT * FROM study_sets WHERE set_id=?`,
        set_id
    );
    return set;
}

async function getAllSets() {
    const [sets] = await db.query(
        `SELECT * FROM study_sets`
    );
    return sets;
}

async function createSet(title, description) {
    const [result] = await db.query(`INSERT INTO study_sets (title, description) VALUES (?, ?)`, [
        title, description,
    ])
    const newSetId = result.insertId
    return findBySetId(newSetId)
}

async function updateSet(set_id, title, description) {
    await db.query(
        `UPDATE study_sets SET title=?, description=? WHERE set_id=?`, [
            title, description, set_id
    ]);
}

async function deleteSet(set_id) {
    await db.query(
        `Delete FROM study_sets WHERE set_id=?`, 
        set_id
    );
}

module.exports = {
    findBySetId,
    getAllSets,
    createSet,
    updateSet,
    deleteSet,
};