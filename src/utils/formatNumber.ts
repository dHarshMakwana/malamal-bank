export const formatNumber = (num: number) => {
  return Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(num);
};
