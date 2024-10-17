import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.div
      animate={{ y: 50 }}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
      className="flex justify-between items-center border border-white/20 backdrop-blur-md px-8 py-4 max-w-4xl mx-auto w-full rounded-3xl shadow-lg"
    >
      <a
        href="/"
        className="bg-transparent font-epilogue text-[#0DA5E9] font-bold text-2xl"
      >
        Jr CrowdFunding
      </a>
      <div className="flex space-x-4 justify-center items-center bg-transparent text-white">
        <a href="/profile" className="bg-transparent font-semibold">
          Profile
        </a>
        <a href="/" className="bg-transparent font-semibold">
          Dashboard
        </a>
        <button className="bg-[#0DA5E9] pt-1 pb-1 rounded-xl text-white px-3">
          Create
        </button>
      </div>
    </motion.div>
  );
}
