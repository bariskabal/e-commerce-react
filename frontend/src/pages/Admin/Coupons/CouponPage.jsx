import { Space, Button, Table, Popconfirm } from "antd";
import { useState, useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export default function CouponPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const token = JSON.parse(localStorage.getItem("token"));
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/coupon`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.accessToken}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setDataSource(data);
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
      title: "Name",
      dataIndex: "code",
      key: "code",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Discount Percent",
      dataIndex: "discountPercent",
      key: "discountPercent",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => navigate(`update/${record._id}`)}>
            Güncelle
          </Button>
          <Popconfirm
            title="Kategori sil"
            description="Kategori silmek istediğinizden emin misiniz?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => deleteCoupons(record._id)}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchCoupons();
  }, []);

  const deleteCoupons = async (couponId) => {
    try {
      const response = await fetch(`${apiUrl}/coupon/${couponId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.accessToken}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        fetchCoupons();
        message.success("Silme işlemi başarılı");
      } else {
        message.error(response.status == 401 ? data.error : "Bir sorun oluştu");
      }
    } catch (err) {
      console.log("Giriş hatası:", err);
    }
  };

  return (
    <>
      <Table
        rowKey={(record) => record._id}
        dataSource={dataSource}
        columns={columns}
        loading={loading}
      />
    </>
  );
}
