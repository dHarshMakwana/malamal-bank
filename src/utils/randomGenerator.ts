export const generateRandomNumber = (): string => {
  const min = 10000000000; // Minimum 11-digit number
  const max = 99999999999; // Maximum 11-digit number
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toString();
};
