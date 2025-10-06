const { createUser } = require('../services/querries');

function UserController(req, res) {
  try {
    const { alias, gender } = req.body;

    //   validate user input
    if (!(alias && gender)) {
      return res
        .status(400)
        .json({ error: 'Alias and Date of birth not entered' });
    }

    //add user to database
    createUser(alias, gender);
    return res.status(200).json({ message: 'user created ' });
  } catch (err) {
    console.error({ message: 'Failed to create new user' });
  }
}

module.exports = UserController;
