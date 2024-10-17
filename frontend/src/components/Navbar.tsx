import { motion } from "framer-motion";
import { LayoutDashboard, SquareUser } from "lucide-react";

export function Navbar() {
  return (
    <motion.div
      animate={{ y: 40 }}
      transition={{ type: "spring", stiffness: 30, damping: 20 }}
      className="fixed top-1 self-center flex justify-between items-center border border-white/20 backdrop-blur-md px-8 py-4 max-w-4xl mx-auto w-full rounded-3xl shadow-secondary"
      style={{
        background: "rgba(255, 255, 255, 0.1)",
      }}
    >
      <a
        href="/"
        className="bg-gradient-to-tr from-[#8A2BE2] to-[#FF6F91] bg-clip-text text-transparent font-epilogue font-bold text-2xl"
      >
        Jr CrowdFunding
      </a>
      <div className="flex space-x-4 justify-center items-center bg-transparent text-white">
        <a
          href="/profile"
          className="bg-transparent flex gap-2 self-center font-semibold"
        >
          <SquareUser />
          <span className="bg-transparent text-lg">Profile</span>
        </a>
        <a
          href="/"
          className="bg-transparent flex gap-2 self-center font-semibold"
        >
          <LayoutDashboard />
          <span className="bg-transparent text-lg">Dashboard</span>
        </a>
        <button className="bg-[#0DA5E9] pt-1 pb-1 font-semibold rounded-xl text-white px-3">
          Create
        </button>
      </div>
    </motion.div>
  );
}
