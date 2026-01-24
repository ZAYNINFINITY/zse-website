const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

const products = [
  {
    name: "Basin Mixer",
    description: "High-quality basin mixer for modern bathrooms",
    price: 2500,
    category: "Taps",
    subcategory: "Basin Mixers",
    images: [{ url: "/assets/products/basin mixer.jpeg", alt: "Basin Mixer" }],
    stock: 50,
    brand: "Premium",
    featured: true
  },
  {
    name: "Basin Pedestal",
    description: "Elegant pedestal for basin installation",
    price: 3500,
    category: "Basins",
    subcategory: "Pedestals",
    images: [{ url: "/assets/products/basin pedestal.jpeg", alt: "Basin Pedestal" }],
    stock: 30,
    brand: "Classic",
    featured: true
  },
  {
    name: "One Piece Toilet",
    description: "Modern one-piece toilet",
    price: 18000,
    category: "Toilets",
    subcategory: "One Piece",
    images: [{ url: "/assets/products/onepiece toilet.jpeg", alt: "One Piece Toilet" }],
    stock: 20,
    brand: "Modern",
    featured: true
  },
  {
    name: "Luxury Shower Sets",
    description: "Complete luxury bathroom shower set",
    price: 12000,
    category: "Taps",
    subcategory: "Shower Sets",
    images: [{ url: "/assets/products/luxury shower sets.jpeg", alt: "Luxury Shower Sets" }],
    stock: 15,
    brand: "Luxury",
    featured: true
  },
  {
    name: "Double Bowl Handmade Kitchen Sink",
    description: "Handcrafted double bowl kitchen sink",
    price: 8000,
    category: "Kitchen Ware",
    subcategory: "Sinks",
    images: [{ url: "/assets/products/double bowl handmade kitchen sink.jpg", alt: "Double Bowl Kitchen Sink" }],
    stock: 10,
    brand: "Handmade",
    featured: true
  },
  {
    name: "Electric Water Heater",
    description: "Efficient electric water heater",
    price: 15000,
    category: "Water Geyser",
    subcategory: "Electric",
    images: [{ url: "/assets/products/electric water heater.jpeg", alt: "Electric Water Heater" }],
    stock: 25,
    brand: "Efficient",
    featured: true
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    await Product.deleteMany({});
    console.log('Products deleted');

    await Product.insertMany(products);
    console.log('Products seeded');

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();


