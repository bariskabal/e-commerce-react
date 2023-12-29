import ProductDetails from "../components/ProductDetails/ProductDetails";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { message } from "antd";

export default function ProductDetailsPage() {
  const { id: productId } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchSingleProduct = async () => {
    try {
      const response = await fetch(`${apiUrl}/products/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setSingleProduct(data);
      } else {
        message.error(response.status == 401 ? data.error : "Bir sorun oluştu");
      }
    } catch (err) {
      console.log("Giriş hatası:", err);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  return singleProduct ? <ProductDetails singleProduct={singleProduct}/> : <p>Ürün bulunamadı</p>;
}
