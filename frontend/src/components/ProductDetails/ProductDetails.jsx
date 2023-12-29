import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Gallery from "./Gallery/Gallery";
import Info from "./Info/Info";
import "./ProductDetails.css";
import Tabs from "./Tabs/Tabs";
import PropTypes from "prop-types";
import {useState} from "react"

export default function ProductDetails({singleProduct}) {
  const [tabsData, setTabsData] = useState([]);

  const updateTabsData = (data) => {
    setTabsData(data);
  };

  return (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          <Breadcrumb />
          <div className="single-content">
            <main className="site-main">
              <Gallery productImages={singleProduct.img}/>
              <Info productItem={singleProduct} tabsData={tabsData}/>
            </main>
          </div>
          <Tabs productItem={singleProduct} onUpdate={updateTabsData}/>
        </div>
      </div>
    </section>
  );
}

ProductDetails.propTypes = {
  singleProduct: PropTypes.object,
};
