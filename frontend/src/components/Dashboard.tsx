import { motion } from "framer-motion";
import { CustomCard } from "./CustomCard";

export function Dashboard() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1 },
    }),
  };

  return (
    <div className="flex flex-col space-y-6">
      <p className="font-semibold text-3xl pt-10 bold-text">All Campaigns</p>
      <div className="grid grid-cols-4 gap-6 overflow-y-auto scroll-smooth">
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={index}
            className="card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            <CustomCard />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
