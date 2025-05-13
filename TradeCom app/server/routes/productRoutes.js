
const express = require("express");
const router = express.Router();
const { getNearbyProducts } = require("../controllers/productController");
   
  const express = require('express');
const Product = require('../models/Product');
      
const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
       


router.get("/products", getNearbyProducts);

module.exports = router;





 router.get('/search', async (req, res) => {
  const q = req.query.q;

  try {
    const results = await Product.find({
      name: { regex: q,options: 'i' } // Case-insensitive match
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});        






const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");


// Upload configuration
const upload = multer({ dest: "uploads/" }); // Adjust to use cloud or static later

// Add product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const product = new Product({
      nameEn: req.body.nameEn,
      nameSw: req.body.nameSw,
      description: req.body.description,
      price: req.body.price,
      imageUrl: req.file.path,
      ownerId: req.user._id // assuming user is logged in
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to add product." });
  }
});

// Get products
router.get("/", async (req, res) => {
  const products = await Product.find({ ownerId: req.user._id });
  res.json(products);
});

module.exports = router;




   // Update availability
router.patch("/:id/availability", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { availableToday: req.body.availableToday },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update availability." });
  }
});     







  
const express = require('express');

const Product = require('../models/Product');

// Get all available products (filter by location optional)
router.get('/', async (req, res) => {
 try {
    const { lng, lat } = req.query;

    let products;
    if (lng && lat) {
      products = await Product.find({
        isAvailableToday: true,
        location: {
          nearSphere:geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
            $maxDistance: 10000 // in meters
          }
        }
      });
    } else {
      products = await Product.find({ isAvailableToday: true });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;

   


 
// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Add new product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const {
      nameEnglish,
      nameSwahili,
      description,
      price,
      quantity,
      category
    } = req.body;

    const product = new Product({
      ownerId: req.user._id, // ensure user is logged in
      nameEnglish,
      nameSwahili,
      description,
      price,
      quantity,
      category,
      imageUrl: `/uploads/${req.file.filename}`,
 location: req.user.location // Make sure user has location
    });

    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

module.exports = router;




// GET products for logged-in business user
router.get('/my-products', async (req, res) => {
  try {
    const ownerId = req.user._id; // You must have req.user populated via auth middleware
    const products = await Product.find({ ownerId });
    res.json(products);
  } catch (err) {
res.status(500).json({ error: 'Could not load products' });
  }
});

module.exports = router;        
        




   // Toggle availability
router.put('/:id/availability', async (req, res) => {
  try {
    const { available } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { available });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update availability' });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});