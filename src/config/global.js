module.exports = {
  error: {
    internalError: {
      code: 500,
      msg: {
        code: 500,
        message: "Internal error, please contact admin",
      },
    },

    existingEmailError: {
      code: 400,
      msg: {
        code: 400,
        message: "Email already exists, please use different email",
      },
    },

    insufficientPrivilege: {
      code: 401,
      msg: {
        code: 401,
        message: "Insufficient privileges to invite user",
      },
    },

    userNotFound: {
      code: 404,
      msg: {
        code: 404,
        message: "User not found",
      },
    },

    groupNotFound: {
      code: 404,
      msg: {
        code: 404,
        message: "Group not found",
      },
    },

    messageNotFound: {
      code: 404,
      msg: {
        code: 404,
        message: "Message not found",
      },
    },
  },

  jwtTokenSecret: "123456789",
  jwtRefreshTokenSecret: "987654321",
  jwtTokenExpirationTime: "3600",
};
