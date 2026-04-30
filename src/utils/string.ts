export const capitalizeFirstLetter = (str: string) => {
  if (!str || typeof str !== 'string') {
    // Handle empty, null, or non-string inputs gracefully
    return str;
  }
  // Get the first character and uppercase it
  const firstLetter = str.charAt(0).toUpperCase();
  // Get the rest of the string starting from the second character
  const restOfString = str.slice(1);
  // Concatenate them
  return firstLetter + restOfString;
};

export const bigString = (str: string | null, length: number = 100) => {
  if (!str || typeof str !== 'string') {
    return str;
  }

  if (str.length > length) return str.substring(0, length - 3) + '...';

  return str;
};