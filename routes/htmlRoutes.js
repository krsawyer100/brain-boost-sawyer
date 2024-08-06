const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");
const db = require("../config/connection");

router.get("/", ({ session: { isLoggedIn } }, res) => {
  res.render("index", { isLoggedIn });
});

router.get("/login", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("login", { error: req.query.error });
});

router.get("/signup", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("signup", { error: req.query.error });
});

router
  .route("/sets")
  .get(async (req, res) => {
  if (!req.session.isLoggedIn) return res.redirect("/login")
  const studySets = await controllers.set.getAllSets(req, res)
  res.render("studySets", { isLoggedIn: req.session.isLoggedIn, StudySet: studySets})
});

router.get("/sets/create", async (req, res) => {
  if (!req.session.isLoggedIn) return res.redirect("/login")
  res.render('newSet', { isLoggedIn: req.session.isLoggedIn, error: req.query.error })
})

router
  .route("/sets/:id")
  .get(async (req, res) => {
  if (!req.session.isLoggedIn) return res.redirect("/login")
  const { studySet, flashcards } = await controllers.set.getSetAndFlashcards(req, res)

  if (!studySet) {
    return res.status(404).send("Study set not found")
  }
  res.render('viewSet', { isLoggedIn: req.session.isLoggedIn, StudySet: studySet, Flashcards: flashcards })
})
  
router.get("/sets/edit/:id", async (req, res) => {
  if (!req.session.isLoggedIn) return res.redirect("/login")
  const { studySet, flashcards } = await controllers.set.getSetAndFlashcards(req, res)
  res.render('editSet', { isLoggedIn: req.session.isLoggedIn, StudySet: studySet, Flashcards: flashcards })
})

module.exports = router;
