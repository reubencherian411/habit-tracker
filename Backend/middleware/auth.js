// middleware/auth.js
const authCheck = (req, res, next) => {
    try {
      // Check if request contains valid user ID
      const userId = req.body.userId;
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized - Missing userId" });
      }
      
      // If you're using JWT tokens instead:
      // const token = req.headers.authorization?.split(' ')[1];
      // const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // req.user = decoded;
      
      next();
    } catch (err) {
      res.status(401).json({ error: "Unauthorized - Invalid credentials" });
    }
  };
  
  module.exports = authCheck;