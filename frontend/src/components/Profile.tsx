import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useStateContext } from "../context";
import { CustomCard } from "./CustomCard";
import { useNavigate } from "react-router-dom";
import { Campaigns } from "../types";
import { CardLoading } from "./CardLoading";

export function Profile() {
  const [campaigns, setCampaigns] = useState<Campaigns[]>([]);
  const { address, contract, getUserCampaigns } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
    if (contract && address) {
      const fetchUserCampaign = async () => {
        setIsLoading(true);
        try {
          const response = await getUserCampaigns();
          setCampaigns(response);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchUserCampaign();
    }
  }, [address, contract]);

  return (
    <>
      {isLoading ? (
        <CardLoading />
      ) : (
        <div className="flex flex-col space-y-6 pt-14 h-screen p-2 md:p-16 lg:p-16">
          <p className="font-semibold text-3xl bold-text flex self-center">
            Your Campaigns
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 scroll-smooth">
            {campaigns
              .filter((c) => parseInt(c.deadline) >= 0)
              .map((campaign, index) => (
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
                    avatar={campaign.avatar}
                    deadline={campaign.deadline}
                    amountCollected={campaign.amountCollected}
                    image={campaign.image}
                    handleClick={() => handleCampaign(campaign)}
                  />
                </motion.div>
              ))}
          </div>
          {!isLoading && (
            <div className="text-xl flex pt-[70%] font-epilogue justify-center  items-center">
              Create your first Campaign
            </div>
          )}
        </div>
      )}
    </>
  );
}
