import Product from "../models/productModel.js";  

// ✅ Add Product (Updated to use categoryName)
const addProduct = async (req, res) => {
    try {
      const { categoryName, productName, price } = req.body;

      if (!categoryName || !productName || !price) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }

      let existingCategory = await Product.findOne({ categoryName });

      if (existingCategory) {
        // Check if item already exists
        const itemExists = existingCategory.items.some(item => item.name === productName);
        if (itemExists) {
          return res.status(400).json({ success: false, message: "Item already exists in this category" });
        }

        // Add new item
        existingCategory.items.push({ name: productName, price });
        await existingCategory.save();
        return res.status(201).json({ success: true, message: "Item added successfully to existing category" });

      } else {
        // Create new category with the item
        const newCategory = new Product({
          categoryName,
          items: [{ name: productName, price }]
        });

        await newCategory.save();
        return res.status(201).json({ success: true, message: "New category and item added successfully" });
      }

    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ success: false, message: "Error adding product" });
    }
  };

  
// ✅ Get all category names only
const getCategories = async (req, res) => {
  try {
    const categories = await Product.find({}, "categoryName");
    res.json(categories.map(cat => cat.categoryName));
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching categories" });
  }
};

// ✅ Get products by categoryName
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({ success: false, message: "Category is required" });
    }

    const categoryData = await Product.findOne({ categoryName: category }, "items");
    if (!categoryData) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.json(categoryData.items);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching products" });
  }
};

export { addProduct, getCategories, getProductsByCategory };
