import { Space, Button, Table, Popconfirm } from "antd";
import { useState, useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Image from "../../../config/Images/image";

export default function ProductPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const token = JSON.parse(localStorage.getItem("token"));
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      render: (_, record) => {
        // img alanının dizi olup olmadığını kontrol et ve buna göre imageUrl belirle
        const imageUrl = Array.isArray(record.img) ? record.img[0] : record.img;
        console.log(record)
        return (
          <Image
            imageUrl={imageUrl}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
            }}
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />,
    },
    {
      title: "Colors",
      dataIndex: "colors",
      key: "colors",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Sizes",
      dataIndex: "sizes",
      key: "sizes",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Current Price",
      dataIndex: "price",
      key: "currentPrice",
      render: (price) => <b>{price.current}</b>,
    },
    {
      title: "Discount",
      dataIndex: "price",
      key: "discount",
      render: (price) => <b>{price.discount ? price.discount : "N/A"}</b>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`update/${record._id}`)}
          >
            Güncelle
          </Button>
          <Popconfirm
            title="Ürün sil"
            description="Ürün silmek istediğinizden emin misiniz?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => deleteProduct(record._id)}
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
    fetchProducts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${apiUrl}/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.accessToken}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        fetchProducts();

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
          message.success("Ürün silme başarılı");
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
