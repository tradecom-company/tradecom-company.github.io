  const express = require("express");
const router = express.Router();
const Shop = require("../models/User"); // Assuming shops are part of user model

router.get("/nearby", async (req, res) => {
 const { lat, lng } = req.query;

  const shops = await Shop.find({
    accountType: "business",
    location: {
      near:geometry: {
          type: "Point",
          coordinates: [parseFloat(lng), parseFloat(lat)]
        },
        $maxDistance: 5000 // 5 km radius
      }
    }
  });

  res.json(shops);
});

module.exports = router;    








 


// GET nearby shops by user's coordinates
router.get('/nearby', async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const shops = await Shop.find({
      location: {
        nearSphere:geometry: {
            type: 'Point',
 coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          maxDistance: 5000 // 5km radius
        );

    res.status(200).json(shops);
   catch (err) 
    res.status(500).json( error: 'Failed to fetch nearby shops' );
  );

module.exports = router;

 