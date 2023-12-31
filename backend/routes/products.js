const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const Product = require("../models/Product.js");
const { isAdmin, isUser } = require("../middleware/checkUserRole");

// New Product
router.post("/", validateToken, isAdmin, async (req, res) => {
  try {
    const product = req.body; // bilgileri aldık
    const existingProduct = await Product.findOne({ name: product.name });
    if (existingProduct == null) {
      const newProduct = new Product(product); // alınan bilgilerle category nesnesi oluşturduk
      await newProduct.save(); // yeni categoryi kaydettik
      return res.status(200).json(newProduct); // eklenen categoryi json ile response olarak döndürdük
    } else {
      return res.status(400).json({ error: "Bu isimde bir ürün zaten var." });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    console.log(err);
  }
});

//Get All Products
router.get("/", async (req, res) => {
  try {
    let products = await Product.find({})
      .populate("colors", "code") // 'colors' referansını 'name' alanı ile doldurur
      .populate("sizes", "size") // 'sizes' referansını 'name' alanı ile doldurur
      .populate("category", "name"); // 'category' referansını 'name' alanı ile doldurur
    // colors ve sizes için isimleri bir diziye çıkarıp, virgülle birleştir
    products = products.map((product) => {
      return {
        ...product.toObject(), // Diğer tüm product alanlarını koru
        colors: product.colors.map((color) => color.code).join(", "),
        sizes: product.sizes.map((size) => size.size).join(", "),
        category: product.category.name, // Kategori adını doğrudan al
      };
    });
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

//Ürünleri filtreleme
router.get("/getFilterProducts", async (req, res) => {
  try {
    const filters = req.query; // Tüm filtreleri alın
    let query = {}; // Veritabanı sorgusu için boş bir nesne oluşturun

    let products = await Product.find({});
    products = filterProducts(products, filters);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Ürünleri isme göre filtreleme
router.get("/search/:productName", async (req, res) => {
  try {
    const productName = req.params.productName;
    const products = await Product.find({
      name: { $regex: productName, $options: "i" }, // regex ile productName'e göre arat diyoruz
    });
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

//Get Product by ID
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId)
      .populate("colors", "code") // 'colors' referansını 'name' alanı ile doldurur
      .populate("sizes", "size") // 'sizes' referansını 'name' alanı ile doldurur
      .populate("category", "name"); // 'category' referansını 'name' alanı ile doldurur; // tüm verileri getirir
    if (!product) {
      return res.status(404).json({ error: "Ürün bulunamadı" });
    }

    // colors ve sizes için isimleri bir diziye çıkarıp, virgülle birleştir
    const productResponse = await {
      ...product.toObject(), // Diğer tüm product alanlarını koru
      colors: product.colors, // Renk kodlarını kontrol et ve birleştir
      sizes: product.sizes, // Bedenleri kontrol et ve birleştir
      category: product.category ? product.category.name : "", // Kategori adını kontrol et ve al
    };
    res.status(200).json(productResponse);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Product update
router.put("/:productId", validateToken, isAdmin, async (req, res) => {
  try {
    const productId = req.params.productId;
    const updates = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product bulunamadı" });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//Product delete
router.delete("/:productId", validateToken, isAdmin, async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

function filterProducts(products, filters) {
  return products.filter((product) => {
    if (filters.colors && filters.colors.length > 0) {
      const productColors = product.colors.map((color) => color.toString());
      if (Array.isArray(filters.colors)) {
        if (
          !filters.colors.some((color) =>
            productColors.includes(color.toString())
          )
        ) {
          return false;
        }
      } else if (!productColors.includes(filters.colors.toString())) {
        return false;
      }
    }

    if (filters.sizes && filters.sizes.length > 0) {
      const productSizes = product.sizes.map((size) => size.toString());
      if (Array.isArray(filters.sizes)) {
        if (
          !filters.sizes.some((size) => productSizes.includes(size.toString()))
        ) {
          return false;
        }
      } else if (!productSizes.includes(filters.sizes.toString())) {
        return false;
      }
    }

    if (filters.category && filters.category.length > 0) {
      const productCategory = product.category.toString();
      if (Array.isArray(filters.category)) {
        if (!filters.category.includes(productCategory)) {
          return false;
        }
      } else if (productCategory !== filters.category.toString()) {
        return false;
      }
    }

    if (filters.name && product.name !== filters.name) {
      return false;
    }

    return true;
  });
}

module.exports = router;
