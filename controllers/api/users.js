const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

module.exports = {
  create,
  login,
  checkToken
};

function checkToken(req, res)
{
  // req.user will always be there for you when a token is sent
  console.log('req.user', req.user);
  res.json(req.exp);
}

function createJWT(user)
{
  console.log("Creating JWT")
  return jwt.sign(
    // data payload
    {user},
    process.env.SECRET,
    {expiresIn: "24h"}
  );
}

async function create(req, res)
{
  try
  {
    let user = await User.create(req.body);
    let token = createJWT(user);
    console.log(`User : ${req.body}, Token: ${token}`);
    
    res.status(200).json(token);
  } catch (error)
  {
    console.log("ERROR:", error);
    res.status(400).json({ msg: error.message });
  }
}

async function login(req, res, next = () => {})
{
  try
  {
    let user = await User.findOne({email: req.body.email});
    console.log(`Current User : ${user}`);
    console.log(`Comparing : ${req.body.password} and also.... ${user.password}`);
    
    if (!user) throw new Error();
    
    let match = await bcrypt.compare(req.body.password, user.password);
    console.log(`MATCH FOUND: ${match}`)
    if (!match) throw new Error();
    
    res.status(200).json(createJWT(user));
    next();
  } catch (error)
  {
    console.log("ERROR:", "Bad Credentials", error);
    res.status(400).json({ msg: error.message });
  }
}
