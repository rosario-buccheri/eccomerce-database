exports.adminRegister = async (req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { name, email, password } = req.body;
  
    try {
    
      const whitelist = process.env.ADMIN_EMAIL_WHITELIST.split(',');
      if (!whitelist.includes(email)) {
        return res.status(403).json({ msg: 'Email non e autorizzata come admin' });
      }
  
    
      let admin = await User.findOne({ where: { email } });
      if (admin) {
        return res.status(400).json({ msg: 'utente amministratore esiste già' });
      }
  
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      admin = await User.create({
        name,
        email,
        password: hashedPassword,
        role : "admin",
      });
  
      res.json({ msg: 'Admin registrato correttamente' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  