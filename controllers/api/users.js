const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const response = require("./response");

module.exports = { create, login, checkToken };

function create(req, res) { response.respond(req, res, createDispatch); }
function login(req, res) { response.respond(req, res, loginDispatch); }

// req.user will always be there for you when a token is sent
function checkToken(req, res)
{
  response.respond(req, res, () =>
  {
    console.log('req.user', req.user);
    return req.exp;
  });
}

async function createDispatch(req)
{
  let user = await User.create(req.body);
  let token = createJWT(user);
  console.log(`User : ${ req.body }, Token: ${ token }`);
  return token;
}

async function loginDispatch(req)
{
  let user = await User.findOne({ email: req.body.email });
  console.log(`Current User : ${ user }`);
  console.log(`Comparing : ${ req.body.password } and also.... ${ user.password }`);

  if (!user) throw new Error();

  let match = await bcrypt.compare(req.body.password, user.password);
  console.log(`MATCH FOUND: ${ match }`);
  if (!match) throw new Error();

  return createJWT(user);
}

function createJWT(user)
{
  console.log("Creating JWT");
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}
