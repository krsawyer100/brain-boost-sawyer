const { User } = require("../models");

async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.redirect("/login?error=must include username and password");

    const user = await User.findByUsername(username);

    if (!user)
      return res.redirect("/login?error=username or password is incorrect");

    const passwordMatches = await User.checkPassword(password, user.password);

    if (!passwordMatches)
      return res.redirect("/login?error=username or password is incorrect");

    req.session.isLoggedIn = true;
    req.session.user_id = user.id;
    req.session.save(() => res.redirect("/"));
  
  } catch (err) {
    return res.status(500).redirect(`/login?error=${err.message}`);
  }
}

async function logout(req, res) {
  req.session.destroy(() => res.redirect("/"));
}

module.exports = { login, logout };
