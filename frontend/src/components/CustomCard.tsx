interface CustomCardProps {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: number;
  amountCollected: string;
  image: string;
  handleClick: () => void;
}

export function CustomCard() {
  //{
  //   owner,
  //   title,
  //   description,
  //   target,
  //   deadline,
  //   amountCollected,
  //   image,
  //   handleClick,
  // }: CustomCardProps
  return (
    <div className="sm:w-[288px] h-fit w-full rounded-[15px] bg-[#141D30] cursor-pointer">
      <img
        src="https://ideogram.ai/assets/progressive-image/balanced/response/7XhjeL97T0SWyh1-miM3qg"
        className="w-full h-[158px] object-cover rounded-t-[15px]"
      />
      <div className="flex flex-col p-4 rounded-xl">
        <div className="block">
          <h3 className="text font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            The Project
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit in
            nemo accusantium ipsam reiciendis recusandae praesentium facere
            voluptatem minima. Provident maxime ipsam reiciendis, soluta
            necessitatibus natus veniam voluptatum et deserunt!
          </p>
        </div>
        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold self-center text-[14px] text-[#b2b3bd] leading-[22px]">
              0
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Raised of 0
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px] self-center">
              10
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Days Left
            </p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img
              src={"https://avatars.githubusercontent.com/u/129896101?v=4"}
              alt="user"
              className="object-contain rounded-full"
            />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            by{" "}
            <span className="text-[#b2b3bd]">
              {"0x1EA51492315976432459698BB3c413bd0c28cF46"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
