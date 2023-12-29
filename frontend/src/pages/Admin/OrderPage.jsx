import { Spin,Table } from "antd";
import { useState, useEffect } from "react";
import { message } from "antd";

export default function OrderPage() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const MY_STRIPE_SECRET_KEY = import.meta.env.VITE_STRIPE_SECRET_KEY

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.stripe.com/v1/payment_intents`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${MY_STRIPE_SECRET_KEY}`,
          },
        }
      );
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setDataSource(data.data);
      } else {
        message.error(response.status == 401 ? data.error : "Bir sorun oluştu");
      }
    } catch (err) {
      console.log("Giriş hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Müşteri mail",
      dataIndex: "receipt_email",
      key: "receipt_email",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Sipariş fiyatı",
      dataIndex: "amount",
      key: "amount",
      render: (record) => <b>${(record / 100).toFixed(2)}</b>,
    },
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Spin spinning={loading}>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record.id}
        loading={loading}
      />
    </Spin>
  );
}
