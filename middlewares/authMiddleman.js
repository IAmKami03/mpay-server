const jwt = require("jsonwebtoken");


const authMiddleman = (req, res, next) => {
  //extract auth header from incoming req
  const authHeader = req.headers.authorization;
  //
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //
    return res.status(401).json({ message: "No Token Provided" });
  }
  //split the header
  const token = authHeader.split(" ")[1];

  try {
    //verify the token
    const payload = jwt.verify(token, process.env.JWT_SECRETKey);
    //
    req.user = { userId: payload.userId };

    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleman;
