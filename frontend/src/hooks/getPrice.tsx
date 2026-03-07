export const getPrice = (amount: number, currency: string): string => {
  return new Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};
