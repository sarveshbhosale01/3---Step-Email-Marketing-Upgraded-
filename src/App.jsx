import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Signup/login";
import Introduction from "./components/Introduction/introduction";
import Template from "./components/Templates/template";
import UploadCustomers from "./components/CustomerUpload/uploadCustomer";
import CampaignType from "./components/CampaignType/CampaignType";
import B2BDashboard from "./components/B2B/B2BDashboard";
import B2CDashboard from "./components/B2C/B2CDashboard";
import SubjectTester from "./components/EmailTools/SubjectTester";
import SpamChecker from "./components/EmailTools/SpamChecker";
import DeliverabilityTester from "./components/EmailTools/DeliverabilityTester";
import IPChecker from "./components/EmailTools/IPChecker";
import WarmupPlanner from "./components/EmailTools/WarmupPlanner";
import DiscountOptimizer from "./components/B2CExclusiveTools/DiscountOptimizer";
import PromotionGenerator from "./components/B2CExclusiveTools/PromotionGenerator";
import EngagementScore from "./components/B2CExclusiveTools/EngagementScore";
import
  ColdEmailGenerator from "./components/B2BExclusiveTools/ColdEmailGenerator";
import OutreachPlanner from "./components/B2BExclusiveTools/OutreachPlanner";
import LeadScore from "./components/B2BExclusiveTools/LeadScore";
import SendingCampaign from "./components/SendingCampaign/SendingCampaign";
import CampaignResult from "./components/CampaignResult/CampaignResult";
import ReviewPage from "./components/Review/ReviewPage";
import ContactPage from "./components/ContactPage/ContactPage";
import ThankYou from "./components/Thankyou/ThankYou";
// Temporary placeholder until you add other pages
const Dashboard = () => (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#01b0f0",
      color: "#fff",
      fontSize: "2rem",
      fontWeight: "bold",
    }}
  >
    Welcome to Dashboard 🚀
  </div>
);

function App() {
  return (
    <Router>
      <div >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Introduction" element={<Introduction />} />
          <Route path="/Template" element={<Template />} />
          <Route path="/UploadCustomers" element={<UploadCustomers />} />
          <Route path="/CampaignType" element={<CampaignType />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/b2b" element={<B2BDashboard />} />
<Route path="/b2c" element={<B2CDashboard />} />
<Route path="/subject-tester" element={<SubjectTester />} />
<Route path="/spam-checker" element={<SpamChecker />} />
<Route path="/deliverability-test" element={<DeliverabilityTester />} />
<Route path="/ip-checker" element={<IPChecker />} />
<Route path="/warmup-planner" element={<WarmupPlanner />} />
<Route path="/discount-optimizer" element={<DiscountOptimizer />} />
<Route path="/engagement-score" element={<EngagementScore />} />
<Route path="/promotion-generator" element={<PromotionGenerator />} />
<Route path="/cold-email-generator" element={<ColdEmailGenerator />} />
<Route path="/outreach-planner" element={<OutreachPlanner />} />
<Route path="/lead-score" element={<LeadScore />} />
<Route path="/sending" element={<SendingCampaign />} />
<Route path="/campaign-result" element={<CampaignResult />} />
<Route path="/review" element={<ReviewPage />} />
<Route path="/contact" element={<ContactPage />} />
<Route path="/thankyou" element={<ThankYou />} />


</Routes>
      </div>
    </Router>
  );
}

export default App;
