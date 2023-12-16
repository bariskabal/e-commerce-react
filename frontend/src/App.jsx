import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import UserPage from "./pages/Admin/UserPage";
import CategoryPage from "./pages/Admin/Categories/CategoryPage";
import UpdateCategoryPage from "./pages/Admin/Categories/UpdateCategoryPage";
import CreateCategoryPage from "./pages/Admin/Categories/CreateCategoryPage";
import CreateProductPage from "./pages/Admin/Products/CreateProductPage";
import ColorPage from "./pages/Admin/Colors/ColorPage";
import UpdateColorPage from "./pages/Admin/Colors/UpdateColorPage";
import CreateColorPage from "./pages/Admin/Colors/CreateColorPage";
import SizePage from "./pages/Admin/Sizes/SizePage";
import UpdateSizePage from "./pages/Admin/Sizes/UpdateSizePage";
import CreateSizePage from "./pages/Admin/Sizes/CreateSizePage";
import ProductPage from "./pages/Admin/Products/ProductPage";
import UpdateProductPage from "./pages/Admin/Products/UpdateProductPage";
import CouponPage from "./pages/Admin/Coupons/CouponPage";
import UpdateCouponPage from "./pages/Admin/Coupons/UpdateCouponPage";
import CreateCouponPage from "./pages/Admin/Coupons/CreateCouponPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/blog/:id" element={<BlogDetailsPage />} />
      <Route path="/admin/*">
        <Route path="users" element={<UserPage />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="categories/update/:id" element={<UpdateCategoryPage />} />
        <Route path="categories/create" element={<CreateCategoryPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="products/create" element={<CreateProductPage />} />
        <Route path="products/update/:id" element={<UpdateProductPage />} />
        <Route path="colors" element={<ColorPage />} />
        <Route path="colors/update/:id" element={<UpdateColorPage />} />
        <Route path="colors/create" element={<CreateColorPage />} />
        <Route path="sizes" element={<SizePage />} />
        <Route path="sizes/update/:id" element={<UpdateSizePage />} />
        <Route path="sizes/create" element={<CreateSizePage />} />
        <Route path="coupons" element={<CouponPage />} />
        <Route path="coupons/create" element={<CreateCouponPage />} />
        <Route path="coupons/update/:id" element={<UpdateCouponPage />} />
      </Route>
    </Routes>
  );
}

export default App;
