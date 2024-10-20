import { motion } from "framer-motion";
import { LayoutDashboard, SquareUser } from "lucide-react";
import { useState } from "react";
import { useStateContext } from "../context";
import { Drawer } from "./Drawer";
import { ConnectButton } from "./ConnectButton";

export function Navbar() {
  const { connect, address } = useStateContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleButtonClick = async () => {
    if (address) {
      setIsDrawerOpen(true);
    } else {
      await connect();
    }
  };

  return (
    <>
      <motion.div
        animate={{ y: 30 }}
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
        className="fixed top-1 self-center flex justify-between items-center border border-white/20 backdrop-blur-md px-4 py-4 max-w-4xl mx-auto w-[95%] rounded-3xl shadow-secondary"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <a
          href="/"
          className="bg-gradient-to-tr from-[#FF42F2] to-[#FF6F21] bg-clip-text text-transparent font-epilogue font-bold text-lg md:text-2xl lg:text-2xl"
        >
          Jr CrowdFunding
        </a>
        <div className="flex space-x-2 justify-center items-center bg-transparent text-white">
          <a
            href="/yourcampaign"
            className="bg-transparent flex gap-2 self-center font-semibold"
          >
            <SquareUser />
            <span className="hidden md:block bg-transparent text-lg">
              Profile
            </span>
          </a>
          <a
            href="/"
            className="bg-transparent flex gap-2 self-center font-semibold"
          >
            <LayoutDashboard />
            <span className="bg-transparent hidden md:block  text-lg">
              Dashboard
            </span>
          </a>
          {address ? (
            <button
              className="bg-[#3FBDD0] pt-1 pb-1 font-semibold rounded-xl text-white px-3"
              onClick={handleButtonClick}
            >
              Create
            </button>
          ) : (
            <ConnectButton color="#3FBDD0" />
          )}
        </div>
      </motion.div>
      {isDrawerOpen && <Drawer closeDrawer={() => setIsDrawerOpen(false)} />}
    </>
  );
}
