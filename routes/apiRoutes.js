const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

// admin login/logout
router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.user.create);

// study sets
router
    .route('/study-sets')
    .post(controllers.set.createSet)
    .get(controllers.set.getAllSets)
router
    .route('/study-sets/:set_id')
    .put(controllers.set.updateSet)
    .delete(controllers.set.deleteSet)

// flashcards
router.post('/flashcards', controllers.flashcard.createFlashcard)
router
    .route('/flashcards/:set_id')
    .get(controllers.flashcard.getAllFlashcards)
    .put(controllers.flashcard.updateFlashcard)
    .delete(controllers.flashcard.deleteFlashcard)
module.exports = router;
