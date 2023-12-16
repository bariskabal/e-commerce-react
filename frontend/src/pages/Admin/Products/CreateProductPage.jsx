import { Form, Input, Button, Upload, InputNumber, Select } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { message, Spin } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const { Dragger } = Upload;
// import { useNavigate } from "react-router-dom";

export default function CreateProductPage() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const token = JSON.parse(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const isSmallScreen = window.innerWidth <= 600; // dinamik takip etmez sayfa yüklendiğinde takip eder
  const [uploadImages, setUploadImages] = useState([]);
  const [form] = Form.useForm();
  //   const navigate = useNavigate();
  const dynamicStyle = {
    textAlign: "center",
    paddingTop: "2rem",
    paddingBottom: "5rem",
    fontSize: isSmallScreen ? "1.5rem" : "2rem",
  };

  const props = {
    name: "img",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
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

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/categories`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setCategories(data);
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
    const fetchColors = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/colors`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setColors(data);
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
    const fetchSizes = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/sizes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setSizes(data);
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
    fetchCategories();
    fetchColors();
    fetchSizes();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
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
          const response2 = await fetch(`${apiUrl}/products`, {
            method: "POST",
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
            message.success("Ürün ekleme başarılı");
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
    } catch (err) {
      console.log("Kategori hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Spin spinning={loading}>
        <h3 style={dynamicStyle}>Product Create</h3>
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
            label="Product Name"
            name="name"
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            rules={[
              {
                required: true,
                message: "Please input your Product Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Product Price"
            name="current"
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            rules={[
              {
                required: true,
                message: "Please input your Product Price!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Product discount"
            name="discount"
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            rules={[
              {
                required: true,
                message: "Please input your Product discount!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Product Description"
            name="description"
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            rules={[
              {
                required: true,
                message: "Please input your Product description!",
              },
            ]}
          >
            <ReactQuill
              style={{
                backgroundColor: "white",
              }}
              theme="snow"
            />
          </Form.Item>
          <Form.Item
            label="Product Image(Links)"
            name="img"
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            rules={[
              {
                required: true,
                message: "Please input your Product Image!",
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
          <Form.Item
            label="Product Colors(RGB)"
            name="colors"
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            rules={[
              {
                required: true,
                message: "Please input your Product Colors!",
              },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
            >
              {colors?.map((color) => (
                <Select.Option value={color._id} key={color._id}>
                  {color.code}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Product Size"
            name="sizes"
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            rules={[
              {
                required: true,
                message: "Please input your Product Size!",
              },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
            >
              {sizes?.map((size) => (
                <Select.Option value={size._id} key={size._id}>
                  {size.size}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Product Category"
            name="category"
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            rules={[
              {
                required: true,
                message: "Please input your Product Category!",
              },
            ]}
          >
            <Select>
              {categories?.map((category) => (
                <Select.Option value={category._id} key={category._id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
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
