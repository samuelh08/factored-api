const User = require('./model');

exports.signup = async (req, res, next) => {
  const { body = {} } = req;
  try {
    const user = await User.create(body);
    res.json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { body = {} } = req;
  const { username = '', password = '' } = body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return next({
        message: 'Username or password invalid',
        statusCode: 401,
        code: 'UNAUTHORIZED',
      });
    }

    const verified = await user.verifyPassword(password);
    if (!verified) {
      return next({
        message: 'Email or password invalid',
        statusCode: 401,
        code: 'UNAUTHORIZED',
      });
    }

    res.json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
