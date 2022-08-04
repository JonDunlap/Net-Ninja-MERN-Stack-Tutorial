const jwt = require('jsonwebtoken');

const requireAuth = async (req, res, next) => {
  // verify authentication token
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ error: 'You must be logged in to access this resource' });
  }

  // get token from request headers
  const token = authorization.split(' ')[1];

  // verify token
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ _id }).select('_id');
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = requireAuth;
