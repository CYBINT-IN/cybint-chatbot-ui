const getKeywords = (str) => {
  return str.split(",").map((keyword) => keyword.trim());
};
export default getKeywords;
