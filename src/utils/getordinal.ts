

export const getOrdinal = (day: number) => {
  // Array of suffixes
  const suffixes = ["th", "st", "nd", "rd"];
  // Handle special cases: 11th, 12th, and 13th
  const remainder = day % 100;
  // Select the correct suffix
  return day + (suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0]);
};