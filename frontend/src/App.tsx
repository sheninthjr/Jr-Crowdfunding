import { Route, Routes } from "react-router-dom";
import { Navbar, Dashboard } from "./components";
import "./index.css";
import { CampaignDetails } from "./components/CampaignDetails";
import { Profile } from "./components/Profile";

export function App() {
  return (
    <div className="max-w-7xl flex flex-col justify-center mx-auto relative h-screen">
      <Navbar />
      <div className="flex-grow flex mx-auto mt-[140px]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}
