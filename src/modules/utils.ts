export const round = (
  value: number,
  decimals: number = 1,
  fixed: boolean = true
): number => {
  const modifier: number = decimals * 10;
  let total: number = Math.round(value * modifier) / modifier;
  if (fixed) {
    return Number(total.toFixed(decimals));
  }
  return total;
};
