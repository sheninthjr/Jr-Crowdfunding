import { motion } from "framer-motion";
import { useState } from "react";
import { useStateContext } from "../context";
import { Loader } from "./Loader";

export function Drawer({ closeDrawer }: { closeDrawer: () => void }) {
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (!form.title || !form.description || !form.target || !form.deadline) {
        console.error("Please fill out all fields");
        setIsLoading(false);
        return;
      }
      const response = await createCampaign(form);
      closeDrawer();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting campaign", error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50"
          style={{
            zIndex: 1000,
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            className="relative bg-white/20 backdrop-blur-lg shadow-2xl border border-white/30 p-10 w-full max-w-lg rounded-3xl"
            style={{
              zIndex: 1001,
              boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
            }}
          >
            <>
              <button
                className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 transition-colors duration-200"
                onClick={closeDrawer}
              >
                ✕
              </button>
              <h2 className="text-lg md:text-3xl font-bold mb-8 text-white">
                Create New Campaign
              </h2>
              <form
                onSubmit={handleSubmit}
                className="flex text-white flex-col gap-6"
              >
                <input
                  type="text"
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="border outline-none border-transparent transition-all duration-300 p-3 rounded-xl bg-white/20 backdrop-blur-lg shadow-inner text-white placeholder-gray-300 font-semibold text-lg"
                />
                <textarea
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="border outline-none border-transparent transition-all duration-300 p-3 rounded-xl bg-white/20 backdrop-blur-lg shadow-inner text-white placeholder-gray-300 font-semibold text-lg"
                />
                <input
                  type="text"
                  placeholder="Target Amount (ETH)"
                  value={form.target}
                  onChange={(e) => setForm({ ...form, target: e.target.value })}
                  className="border border-transparent outline-none transition-all duration-300 p-3 rounded-xl bg-white/20 backdrop-blur-lg shadow-inner text-white placeholder-gray-300 font-semibold text-lg"
                />
                <input
                  type="date"
                  placeholder="Deadline"
                  value={form.deadline}
                  onChange={(e) =>
                    setForm({ ...form, deadline: e.target.value })
                  }
                  className="border border-transparent outline-none transition-all duration-300 p-3 rounded-xl bg-white/20 backdrop-blur-lg shadow-inner text-white w-full placeholder-gray-300 font-semibold text-lg"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="border border-transparent outline-none transition-all duration-300 p-3 rounded-xl bg-white/20 backdrop-blur-lg shadow-inner text-white placeholder-gray-300 font-semibold text-lg"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                >
                  Submit
                </button>
              </form>
            </>
          </div>
        </motion.div>
      )}
    </div>
  );
}
