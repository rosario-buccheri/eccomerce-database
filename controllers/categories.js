const Category = require('../models/category');
//GET
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
//creazione categoria
exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const exitingCategory = await Category.findOne({where: {name}});
    if (!exitingCategory) {
      const category = await Category.create({ name });
      return res.status(200).json({ msg: 'Categoria creata', category });
    } else {
      return res.status(400).json({ msg: 'Categoria già esistente' });
    }
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
//PUT
exports.updateCategory = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    let category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ msg: 'Categoria non trovata' });
    }

    // Update category
    category.name = name;
    await category.save();

    res.json({msg:'categoria cambiata con successo',category});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
