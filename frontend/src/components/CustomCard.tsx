interface CustomCardProps {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: number; // Consider formatting this to a readable date if needed
  amountCollected: string;
  image: string;
  handleClick: () => void;
}

export function CustomCard({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}: CustomCardProps) {
  return (
    <div
      className="sm:w-[288px] h-fit w-full rounded-[15px] bg-[#141D30] cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={image} // Use the passed image prop
        className="w-full h-[158px] object-cover rounded-t-[15px]"
        alt={title} // Use the title as alt text for accessibility
      />
      <div className="flex flex-col p-4 rounded-xl">
        <div className="block">
          <h3 className="text font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {title} {/* Display the title */}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            {description} {/* Display the description */}
          </p>
        </div>
        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold self-center text-[14px] text-[#b2b3bd] leading-[22px]">
              {amountCollected} {/* Display the amount collected */}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Raised of {target} {/* Display the target */}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px] self-center">
              {/* Calculate days left based on the deadline */}
              {Math.max(
                0,
                Math.floor((deadline - Date.now()) / 1000 / 60 / 60 / 24)
              )}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Days Left
            </p>
          </div>
        </div>
        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img
              src={"https://avatars.githubusercontent.com/u/129896101?v=4"} // Placeholder user image
              alt="user"
              className="object-contain rounded-full"
            />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            by{" "}
            <span className="text-[#b2b3bd]">
              {owner} {/* Display the owner's address */}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
