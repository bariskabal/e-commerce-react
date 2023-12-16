import { Layout, Menu } from "antd";
import PropTypes from "prop-types";

import {
  DashboardOutlined,
  AppstoreOutlined,
  LaptopOutlined,
  BarcodeOutlined,
  RollbackOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Sider, Header, Content } = Layout;

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       console.log("geldi");
  //       const response = await fetch(`${apiUrl}/user/currentUserRoles`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token.accessToken}`,
  //         },
  //       });
  //       console.log(response);
  //       if (response.status) {
  //         message.error(
  //           response.status == 400 ? response.error : "Bir sorun oluştu"
  //         );
  //       }
  //       console.log("geldi");
  //       const role = await response.json();
  //       console.log(role);
  //       await setUserRoleState(role);
  //       console.log(response);
  //       console.log(role);
  //       return role;
  //     } catch (error) {
  //       console.log("Error fetching user roles:", error);
  //     }
  //   };
  //   getUser();
  // }, []);

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => {
        navigate(`/admin`);
      },
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Kategoriler",
      path: "/",
      children: [
        {
          key: "3",
          label: "Kategori Listesi",
          path: "/admin/categories",
          onClick: () => {
            navigate(`/admin/categories`);
          },
        },
        {
          key: "4",
          label: "Yeni Kategori Oluştur",
          path: "/admin/categories/create",
          onClick: () => {
            navigate("/admin/categories/create");
          },
        },
      ],
    },
    {
      key: "5",
      icon: <LaptopOutlined />,
      label: "Ürünler",
      path: "/",
      children: [
        {
          key: "6",
          label: "Ürün Listesi",
          path: "/admin/products",
          onClick: () => {
            navigate(`/admin/products`);
          },
        },
        {
          key: "7",
          label: "Yeni Ürün Oluştur",
          path: "/admin/products/create",
          onClick: () => {
            navigate("/admin/products/create");
          },
        },
      ],
    },
    {
      key: "8",
      icon: <BarcodeOutlined />,
      label: "Kuponlar",
      path: "/admin/coupons",
      children: [
        {
          key: "9",
          label: "Kupon Listesi",
          path: "/admin/coupons",
          onClick: () => {
            navigate(`/admin/coupons`);
          },
        },
        {
          key: "10",
          label: "Yeni Kupon Oluştur",
          path: "/admin/coupons/create",
          onClick: () => {
            navigate("/admin/coupons/create");
          },
        },
      ],
    },
    {
      key: "14",
      icon: <BarcodeOutlined />,
      label: "Renkler",
      path: "/admin/colors",
      children: [
        {
          key: "15",
          label: "Renk Listesi",
          path: "/admin/coupons",
          onClick: () => {
            navigate(`/admin/colors`);
          },
        },
        {
          key: "16",
          label: "Yeni Renk Oluştur",
          path: "/admin/colors/create",
          onClick: () => {
            navigate("/admin/colors/create");
          },
        },
      ],
    },
    {
      key: "17",
      icon: <BarcodeOutlined />,
      label: "Bedenler",
      path: "/admin/sizes",
      children: [
        {
          key: "18",
          label: "Beden Listesi",
          path: "/admin/sizes",
          onClick: () => {
            navigate(`/admin/sizes`);
          },
        },
        {
          key: "19",
          label: "Yeni Beden Oluştur",
          path: "/admin/sizes/create",
          onClick: () => {
            navigate("/admin/sizes/create");
          },
        },
      ],
    },
    {
      key: "11",
      icon: <UserOutlined />,
      label: "Kullanıcı Listesi",
      path: "/admin/users",
      onClick: () => {
        navigate(`/admin/users`);
      },
    },
    {
      key: "12",
      icon: <ShoppingCartOutlined />,
      label: "Siparişler",
      onClick: () => {
        navigate(`/admin/orders`);
      },
    },
    {
      key: "13",
      icon: <RollbackOutlined />,
      label: "Ana Sayfaya Git",
      onClick: () => {
        navigate(`/`);
      },
    },
  ];

  // if (userRoleState == "admin") {
    return (
      <div className="admin-layout">
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider className="" width={200} theme="dark">
            <Menu
              mode="vertical"
              style={{
                height: "100%",
                padding: "1rem 0",
              }}
              items={menuItems}
            />
          </Sider>
          <Layout>
            <Header>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "white",
                }}
              >
                <h2>Admin Paneli</h2>
              </div>
            </Header>
            <Content>
              <div
                className="side-layout-background"
                style={{
                  padding: "24px 50px",
                  minHeight: 360,
                }}
              >
                {children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  // } else {
  //   return navigate("/");
  // }
}

AdminLayout.propTypes = {
  children: PropTypes.node,
};
