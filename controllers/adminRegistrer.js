// controllers/auth.js

exports.adminRegister = async (req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { name, email, password } = req.body;
  
    try {
    
      const whitelist = process.env.ADMIN_EMAIL_WHITELIST.split(',');
      if (!whitelist.includes(email)) {
        return res.status(403).json({ msg: 'Email not authorized for admin access' });
      }
  
    
      let admin = await User.findOne({ where: { email } });
      if (admin) {
        return res.status(400).json({ msg: 'Admin user already exists' });
      }
  
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create nuovo utente
      admin = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin: true,
      });
  
      res.json({ msg: 'Admin user registered successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  