import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  MetaMaskWallet,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

interface FormData {
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
}

interface Campaign {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: number;
  amountCollected: string;
  image: string;
  pId: number;
}

interface StateContextType {
  address: string | undefined;
  contract: any;
  connect: () => Promise<MetaMaskWallet>;
  createCampaign: (form: FormData) => Promise<void>;
  getCampaigns: () => Promise<Campaign[]>;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { contract } = useContract(
    "0x652809672fBcaEDD78aa0b308C0e3e6cD72D8293"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form: FormData) => {
    try {
      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });

      console.log("Contract call success", data);
    } catch (error) {
      console.error("Error during contract call", error);
    }
  };

  const getCampaigns = async () => {
    if (!contract) {
      return [];
    }
    try {
      const campaigns = await contract.call("getCampaign");
      const parsedCampaigns = campaigns.map(
        (campaign: Campaign, i: number) => ({
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target.toString()),
          deadline: campaign.deadline,
          amountCollected: ethers.utils.formatEther(
            campaign.amountCollected.toString()
          ),
          image: campaign.image,
          pId: i,
        })
      );

      return parsedCampaigns;
    } catch (error) {
      console.error("Error fetching campaigns", error);
      return [];
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error(
      "useStateContext must be used within a StateContextProvider"
    );
  }
  return context;
};
