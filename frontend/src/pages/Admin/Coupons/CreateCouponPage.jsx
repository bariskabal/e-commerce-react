import { Form, Input, Button } from "antd";
import { useState } from "react";
import { message, Spin } from "antd";
// import { useNavigate } from "react-router-dom";

export default function CreateCouponPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const token = JSON.parse(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const isSmallScreen = window.innerWidth <= 600; // dinamik takip etmez sayfa yüklendiğinde takip eder
  const [form] = Form.useForm();

  //   const navigate = useNavigate();
  const dynamicStyle = {
    textAlign: "center",
    paddingTop: "2rem",
    paddingBottom: "5rem",
    fontSize: isSmallScreen ? "1.5rem" : "2rem",
  };

  const onFinish = async (values) => {
    setLoading(true);
        try {
          const response2 = await fetch(`${apiUrl}/coupon`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.accessToken}`,
            },
            body: JSON.stringify({
              ...values,
            }),
          });
          const data2 = await response2.json();
          console.log(response2);

          if (response2.ok) {
            message.success("Ürün ekleme başarılı");
            form.resetFields();
          } else {
            message.error(
              response2.status == 400 ? data2.error : "Bir sorun oluştu"
            );
          }
        } catch (err) {
          console.log("Kategori hatası:", err);
        }finally {
          setLoading(false);
        }
      }

  return (
    <>
      <Spin spinning={loading}>
        <h3 style={dynamicStyle}>Coupon Create</h3>
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
            label="Coupon Code"
            name="code"
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            rules={[
              {
                required: true,
                message: "Please input your Coupon Code!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Discount Percent"
            name="discountPercent"
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            rules={[
              {
                required: true,
                message: "Please input your Discount Percent!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Oluştur
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
}
