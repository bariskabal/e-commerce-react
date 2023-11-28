import React from "react";
import Products from "../components/Product/Products";
import Campaigns from "../components/Campaigns/Campaigns";
import CampaignSingle from "../components/CampaignSingle/CampaignSingle";
import Categories from "../components/Category/Categories";

export default function ShopPage() {
  return (
    <React.Fragment>
      <Categories />
      <Products />
      <Campaigns />
      <CampaignSingle />
      <Products />
    </React.Fragment>
  );
}
