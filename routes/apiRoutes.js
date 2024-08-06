const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

// admin login/logout
router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.user.create);

// Study Sets
router
    .route("/sets")
    .get(controllers.set.getAllSets)

router
    .route("/sets/:id")
    .get(controllers.set.getSetAndFlashcards)
    .delete(controllers.set.deleteSet)
    .put(controllers.set.updateSet)

router
    .route("/sets/create")
    .post(controllers.set.createSet)

router
    .route("/sets/edit/:id")
    .get(checkAuth, controllers.set.getSetAndFlashcards)
    .put(controllers.set.updateSet)

module.exports = router;
