// controllers/auth.js

exports.logout = async (req, res) => {
    // In a real-world scenario, you might clear session or token from client side
    res.json({ msg: 'User logged out successfully' });
  };
  