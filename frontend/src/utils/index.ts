// @ts-ignore
import jazzicon from "@metamask/jazzicon";

export const daysLeft = (deadline: any) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);
  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal: number, raisedAmount: number) => {
  if (goal === 0) return 0;
  const percentage = (raisedAmount / goal) * 100;
  return Math.min(Math.round(percentage), 100) / 100;
};

export const checkIfImage = (url: any, callback: any) => {
  const img = new Image();
  img.src = url;
  if (img.complete) callback(true);
  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};
const cache: { [key: string]: string } = {};

export const generateAvatarUrl = (address: string, size: number): string => {
  if (!address || address.length !== 42) return "";
  const cacheKey = `${size}-${address}`;
  if (cache[cacheKey]) return cache[cacheKey];
  const seed = parseInt(address.slice(2, 10), 16);
  const icon = jazzicon(size, seed).firstChild as SVGElement | null;
  if (!icon) return "";
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(icon);
  const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    svgString
  )}`;
  cache[cacheKey] = svgDataUrl;
  return svgDataUrl;
};
