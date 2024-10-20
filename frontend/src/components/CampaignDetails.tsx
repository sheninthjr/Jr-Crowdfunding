import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useStateContext } from "../context";
import { calculateBarPercentage } from "../utils";
import { Loader } from "./Loader";
import CountBox from "./CountBox";

export function CampaignDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address, connect } =
    useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState<any[]>([]);

  const remainingDays = state.deadline;

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    if (!address) {
      await connect();
    }
    try {
      setIsLoading(true);
      const response = await donate(state.pId, amount);
      navigate("/");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen pt-12 max-w-4xl">
      <div className="container mx-auto">
        {isLoading && <Loader />}
        <div className="w-full flex flex-col overflow-hidden p-2 gap-[30px] justify-center">
          <div className="flex-1 flex-col">
            <img
              src={state.image}
              alt="campaign"
              className="w-full h-[410px] object-cover rounded-xl"
            />
            <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
              <div
                className="absolute h-full bg-[#4acd8d]"
                style={{
                  width: `${calculateBarPercentage(
                    state.target,
                    state.amountCollected
                  )}%`,
                  maxWidth: "100%",
                }}
              ></div>
            </div>
          </div>
          <div className="flex flex-wrap p-2 md:p-0 lg:p-0 xl:p-0 justify-evenly gap-[30px]">
            <CountBox
              title="Days Left"
              value={remainingDays > 0 ? remainingDays : "LastDay"}
            />
            <CountBox
              title={`Raised of ${state.target}`}
              value={state.amountCollected}
            />
            <CountBox title="Total Donators" value={donators.length} />
          </div>
        </div>
        <div className="mt-[60px] flex lg:flex-row flex-col gap-5 p-2 md:p-4 lg:p-0 xl:p-0">
          <div className="flex-[2] flex flex-col gap-[40px]">
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Creator
              </h4>
              <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full cursor-pointer">
                  <img
                    src={state.avatar}
                    alt="user"
                    className="w-[70%] h-[70%] object-contain rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                    {state.owner}
                  </h4>
                  <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                    Campaigns
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Description
              </h4>
              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  {state.description}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Donators
              </h4>
              <div className="mt-[20px] flex flex-col gap-4 mb-4">
                {donators.length > 0 ? (
                  donators.map((item, index) => (
                    <div
                      key={`${item.donator}-${index}`}
                      className="flex justify-between items-center gap-4"
                    >
                      <p className="font-epilogue font-normal text-[12px] md:text-[16px] text-[#b2b3bd] leading-[26px] break-all">
                        {index + 1}. {item.donator}
                      </p>
                      <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-all">
                        {item.donation}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    No donators yet. Be the first one!
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Fund
            </h4>
            <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
              <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
                Fund the campaign
              </p>
              <div className="mt-[30px] space-y-8">
                <input
                  type="number"
                  placeholder="ETH 0.1"
                  step="0.01"
                  className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button
                  title="Fund Campaign"
                  className="w-full bg-[#8c6dfd] p-4 rounded-lg"
                  onClick={handleDonate}
                >
                  {address ? "Fund Campaign" : "Connect"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
