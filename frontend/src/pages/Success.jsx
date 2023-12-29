import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartProvider";
import { useContext,useEffect } from "react";

export default function Success() {
  const { setCartItems } = useContext(CartContext);

  useEffect(() => {
    setCartItems([])
  }, [])
  

  return (
    <div className="success-page">
      <div className="container">
        <Result
          status="success"
          title="Ödeme başarılı!"
          subTitle="Siparişiniz başarıyla tamamlandı."
          extra={[
            <Link  to={"/"} key="home">
                <Button type="primary">
                    Anasayfa
                </Button>
            </Link>,
            <Button key="buy">Siparişlerim</Button>
          ]}
        />
      </div>
    </div>
  );
}
