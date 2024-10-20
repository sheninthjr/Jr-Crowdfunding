import { ConnectWallet, darkTheme } from "@thirdweb-dev/react";

export function ConnectButton({ color }: { color: string }) {
  return (
    <ConnectWallet
      theme={darkTheme({
        colors: {
          primaryButtonBg: color,
          accentText: "#ffff",
        },
      })}
      style={{
        paddingTop: "8px",
        minWidth: "10px",
        paddingBottom: "8px",
        paddingLeft: "6px",
        paddingRight: "6px",
        color: "white",
      }}
      btnTitle="Connect"
      className=""
    />
  );
}
