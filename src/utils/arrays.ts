export const generateRandomArrayItems = <T>(arr: Array<T>, count: number) => {
  // Copy array to avoid mutating the original
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, count);
};
