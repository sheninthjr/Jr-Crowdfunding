export const daysLeft = (deadline: any) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);
  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal: number, raisedAmount: number) => {
  if (goal === 0) return 0;
  const percentage = (raisedAmount / goal) * 100;
  return Math.min(Math.round(percentage), 100);
};

export const checkIfImage = (url: any, callback: any) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};
