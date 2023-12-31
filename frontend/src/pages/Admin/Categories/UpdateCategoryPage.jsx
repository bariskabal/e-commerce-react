import { Form, Input, Button, Upload } from "antd";
import { useState, useEffect } from "react";
import { message, Spin } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { InboxOutlined } from "@ant-design/icons";
const { Dragger } = Upload;

export default function UpdateCategoryPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const token = JSON.parse(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const isSmallScreen = window.innerWidth <= 600; // dinamik takip etmez sayfa yüklendiğinde takip eder
  const params = useParams();
  const categoryId = params.id;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [uploadImages, setUploadImages] = useState([]);
  const dynamicStyle = {
    textAlign: "center",
    paddingTop: "2rem",
    paddingBottom: "5rem",
    fontSize: isSmallScreen ? "1.5rem" : "2rem",
  };

  const props = {
    name: "img",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    beforeUpload: () => {
      // Eğer zaten bir dosya yüklendi ise, yeni yüklemeyi engelle
      if (uploadImages.length >= 1) {
        message.error("You can only upload one file.");
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    async onRemove(file) {
      // Kaldırılan dosyanın referansını bulun ve state'ten çıkarın
      const newUploadImages = uploadImages.filter(item => item.uid !== file.uid);
      await setUploadImages(newUploadImages);
    },
    async onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        message.success(`${info.file.name} file uploading.`);
      }
      if (status === "done") {
        await setUploadImages(info.fileList.map((file) => file.originFileObj));
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      if(uploadImages.length !== 0) {
        uploadImages.map((img) => {
          formData.append("img", img); // How to get the input value here as a second parameter, so than i can pass the label name and corresponding value to form data.
        });
        const response = await fetch(`${apiUrl}/images`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
          body: formData,
        });
        const data = await response.json();
        if (response.ok) {
          try {
            values.img = data.imagePaths;
            const response2 = await fetch(`${apiUrl}/categories/${categoryId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.accessToken}`,
              },
              body: JSON.stringify({
                ...values,
                price: {
                  current: values.current,
                  discount: values.discount,
                },
              }),
            });
            const data2 = await response2.json();
            console.log(response2);
  
            if (response2.ok) {
              message.success("Ürün güncelleme başarılı");
              navigate("/admin/categories")
            } else {
              message.error(
                response2.status == 400 ? data2.error : "Bir sorun oluştu"
              );
            }
          } catch (err) {
            console.log("Kategori hatası:", err);
          }
        } else {
          message.error(response.status == 401 ? data.error : "Bir sorun oluştu");
        }
      } else {
          try {
            const response2 = await fetch(`${apiUrl}/categories/${categoryId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.accessToken}`,
              },
              body: JSON.stringify({
                ...values,
                price: {
                  current: values.current,
                  discount: values.discount,
                },
              }),
            });
            const data2 = await response2.json();
            console.log(response2);
  
            if (response2.ok) {
              message.success("Ürün güncelleme başarılı");
            } else {
              message.error(
                response2.status == 400 ? data2.error : "Bir sorun oluştu"
              );
            }
          } catch (err) {
            console.log("Kategori hatası:", err);
          }
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
        const response = await fetch(`${apiUrl}/categories/${categoryId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok && data) {
          form.setFieldsValue({
            name: data.name,
            img: data.img,
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
  }, [apiUrl, categoryId, form]);

  return (
    <>
      <Spin spinning={loading}>
        <h3 style={dynamicStyle}>Category Update</h3>
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
            label="Category Name"
            name="name"
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            rules={[
              {
                required: true,
                message: "Please input your Category Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Category Image"
            name="img"
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            rules={[
              {
                required: true,
                message: "Please input your Category Image!",
              },
            ]}
          >
            <Dragger
              style={{
                backgroundColor: "#fff",
              }}
              {...props}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
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
