import CampaignItem from "./CampaignItem";
import "./Campaigns.css"
export default function Campaigns() {
  return (
    <section className="campaigns">
      <div className="container">
        <div className="campaigns-wrapper">
          <CampaignItem />
          <CampaignItem />
        </div>
        <div className="campaigns-wrapper">
        <CampaignItem />
        <CampaignItem />
        </div>
      </div>
    </section>
  );
}
