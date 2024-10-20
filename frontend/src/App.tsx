import { Route, Routes } from "react-router-dom";
import { Navbar, Dashboard, Profile, CampaignDetails } from "./components";
import "./index.css";

export function App() {
  return (
    <div className="max-w-7xl flex flex-col justify-center mx-auto relative h-screen">
      <Navbar />
      <div className="flex-grow flex mx-auto mt-[140px]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
    </div>
  );
}
