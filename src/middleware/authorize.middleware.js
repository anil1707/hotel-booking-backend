const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (
      !req.user ||
      !req.user.roles ||
      !req.user.roles.some((role) =>
        allowedRoles.includes(role)
      )
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };
};

export default authorize;