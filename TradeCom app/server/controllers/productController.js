
const Product = require("../models/Product");

exports.getNearbyProducts = async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ message: "Location required" });
  }

  try {
    const products = await Product.find({
      available: true,
      location: {
        near:geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: 10000 // 10km radius
        }
      }
    }).populate("shopId", "bussinessName");

    res.json({ products });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error" });
  }
};




