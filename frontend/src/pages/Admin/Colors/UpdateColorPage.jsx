import { Form, Button, Input } from "antd";
import { useState, useEffect } from "react";
import { message, Spin } from "antd";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateColorPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const token = JSON.parse(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const isSmallScreen = window.innerWidth <= 600; // dinamik takip etmez sayfa yüklendiğinde takip eder
  const params = useParams();
  const colorId = params.id;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dynamicStyle = {
    textAlign: "center",
    paddingTop: "2rem",
    paddingBottom: "5rem",
    fontSize: isSmallScreen ? "1.5rem" : "2rem",
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/colors/${colorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.accessToken}`,
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        message.success("Renk güncelleme başarılı");
        navigate("/admin/colors")
      } else {
        message.error(response.status == 401 ? data.error : "Bir sorun oluştu");
      }
    } catch (err) {
      console.log("Kategori hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/colors/${colorId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok && data) {
          form.setFieldsValue({
            code: data.code,
          });
        } else {
          message.error(
            response.status == 401 ? data.error : "Bir sorun oluştu"
          );
        }
      } catch (err) {
        console.log("Giriş hatası:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [apiUrl, colorId, form]);

  return (
    <>
      <Spin spinning={loading}>
        <h3 style={dynamicStyle}>Color Update</h3>
        <Form
          form={form}
          name="basic"
          layout="vertical"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            label="Color Code"
            name="code"
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            rules={[
              {
                required: true,
                message: "Please input your Color Code!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
}
