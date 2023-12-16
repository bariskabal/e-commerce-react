import { Space, Button, Table, Popconfirm } from "antd";
import { useState, useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Image from "../../../config/Images/image";

export default function CategoryPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const token = JSON.parse(localStorage.getItem("token"));
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
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
      title: "Kategori Görseli",
      dataIndex: "img",
      key: "img",
      render: (_, record) => (
        <Image imageUrl={record.img[0]} style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
        }} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
            onConfirm={() => deleteCategory(record._id)}
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
    fetchCategories();
  }, []);

  const deleteCategory = async (productId) => {
    try {
      const response = await fetch(`${apiUrl}/categories/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.accessToken}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        fetchCategories();

        // Eğer ürün silindi ise, ilişkili görüntüleri sil
        if (data.img && data.img.length) {
          // Burada data.img bir dizi varsayılıyor. Eğer değilse, uygun bir şekilde düzenleyin.
          for (const imgName of data.img) {
          console.log(`${apiUrl}${imgName}`)
            await fetch(`${apiUrl}${imgName}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.accessToken}`,
              },
            });
          }
        }
        if (response.ok) {
          message.success("Categori silme başarılı");
        } else {
          message.error(
            response.status == 400 ? data.error : "Bir sorun oluştu"
          );
        }
      } else {
        message.error(
          response.status === 401 ? data.error : "Bir sorun oluştu"
        );
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
