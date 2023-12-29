import "./Tabs.css";
import Reviews from "../../Reviews/Reviews";
import { useState } from "react";
import PropTypes from "prop-types";

export default function Tabs({ productItem,onUpdate }) {
  const [activeTab, setActiveTab] = useState("desc");

  const handleTabClick = (e, tab) => {
    setActiveTab(tab);
    event.preventDefault();
  };

  return (
    <div className="single-tabs">
      <ul className="tab-list">
        <li>
          <a
            onClick={(e) => handleTabClick(e, "desc")}
            href="#"
            className={`tab-button ${activeTab === "desc" ? "active" : ""}`}
          >
            Description
          </a>
        </li>
        <li>
          <a
            onClick={(e) => handleTabClick(e, "info")}
            href="#"
            className={`tab-button ${activeTab === "info" ? "active" : ""}`}
          >
            Additional information
          </a>
        </li>
        <li>
          <a
            onClick={(e) => handleTabClick(e, "review")}
            href="#"
            className={`tab-button ${activeTab === "review" ? "active" : ""}`}
          >
            Reviews
          </a>
        </li>
      </ul>
      <div className="tab-panel">
        <div
          className={`tab-panel-descriptions content ${
            activeTab === "desc" ? "active" : ""
          }`}
          id="desc"
        >
          <p dangerouslySetInnerHTML={{ __html: productItem.description }} />
        </div>
        <div
          className={`tab-panel-information content ${
            activeTab === "info" ? "active" : ""
          }`}
          id="info"
        >
          <h3>Additional information</h3>
          <table>
            <tbody>
              <tr>
                <th>Color</th>
                <td>
                  <p>
                    {productItem.colors.map((color, index) => (
                      <span key={color._id}>
                        {color.code.toUpperCase()}
                        {index < productItem.colors.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </td>
              </tr>
              <tr>
                <th>Size</th>
                <td>
                  <p>
                    {productItem.sizes.map((size, index) => (
                      <span key={size._id}>
                        {size.size.toUpperCase()}
                        {index < productItem.sizes.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Reviews
          active={activeTab === "review" ? "active content" : "content"}
          productId={productItem._id} onUpdate={onUpdate}
        />
      </div>
    </div>
  );
}

Tabs.propTypes = {
  productItem: PropTypes.object,
  onUpdate: PropTypes.func
};
