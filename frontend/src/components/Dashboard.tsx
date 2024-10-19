import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CustomCard } from "./CustomCard";
import { Campaign, useStateContext } from "../context";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const { getCampaigns } = useStateContext();
  const [campaigns, setCampaigns] = useState<Campaign | []>([]);
  const navigate = useNavigate();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1 },
    }),
  };
  const handleCampaign = (campaign: Campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      const campaignData = await getCampaigns();
      setCampaigns(campaignData);
    };
    fetchCampaigns();
  }, [getCampaigns]);

  return (
    <div className="flex flex-col space-y-6">
      <p className="font-semibold text-3xl bold-text flex self-center">
        All Campaigns
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
