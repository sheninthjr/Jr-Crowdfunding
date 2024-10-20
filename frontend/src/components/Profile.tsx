import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useStateContext } from "../context";
import { CustomCard } from "./CustomCard";
import { useNavigate } from "react-router-dom";
import { Campaigns } from "../types";

export function Profile() {
  const [campaigns, setCampaigns] = useState<Campaigns[]>([]);
  const { address, contract, getUserCampaigns } = useStateContext();
  const navigate = useNavigate();

  const fetchUserCampaign = async () => {
    const response = await getUserCampaigns();
    setCampaigns(response);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1 },
    }),
  };

  const handleCampaign = (campaign: Campaigns) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  useEffect(() => {
    if (contract) fetchUserCampaign();
  }, [address, contract]);

  return (
    <div className="flex flex-col space-y-6">
      <p className="font-semibold text-3xl bold-text flex self-center">
        Your Campaigns
      </p>
      <div className="grid grid-cols-4 gap-6 overflow-y-auto scroll-smooth">
        {campaigns.map((campaign, index) => (
          <motion.div
            key={index}
            className="card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            <CustomCard
              owner={campaign.owner}
              title={campaign.title}
              description={campaign.description}
              target={campaign.target}
              deadline={campaign.deadline}
              amountCollected={campaign.amountCollected}
              image={campaign.image}
              handleClick={() => handleCampaign(campaign)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
