import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useContractWrite,
  useConnect,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { daysLeft, generateAvatarUrl } from "../utils";
import { Campaigns } from "../types";

interface FormData {
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
}

export interface Campaign {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: {
    _hex: string;
  };
  avatar: string;
  amountCollected: string;
  image: string;
  pId: number;
}

interface StateContextType {
  address: string | undefined;
  contract: any;
  connect: () => Promise<any>;
  createCampaign: (form: FormData) => Promise<void>;
  getCampaigns: () => Promise<Campaigns[]>;
  getUserCampaigns: () => Promise<Campaigns[]>;
  donate: (pId: number, amount: string) => Promise<void>;
  getDonations: (pId: number) => Promise<any[]>;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { contract } = useContract(
    "0x4Ac84234C1515B00Ef1850Ce60262e677599816e"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useConnect();

  const publishCampaign = async (form: FormData) => {
    if (!address) {
      console.error("Address is undefined. Please connect your wallet.");
      return;
    }
    try {
      const avatar = generateAvatarUrl(address, 48);
      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.target,
          avatar,
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
          avatar: campaign.avatar,
          deadline: daysLeft(parseInt(campaign.deadline._hex, 16)),
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

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    const userCampaign = allCampaigns.filter(
      (c: Campaign) => c.owner == address
    );
    return userCampaign;
  };

  const donate = async (pId: number, amount: string) => {
    const response = await contract?.call("donateToCampaign", [pId], {
      value: ethers.utils.parseEther(amount),
    });
    return response;
  };

  const getDonations = async (pId: number) => {
    const donations = await contract?.call("getDonators", [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };
  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
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
