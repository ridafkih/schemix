export const parseStringOrObject = (toParse: string | object) => {
  const type = typeof toParse;
  if (type === "string") return toParse;
  else return JSON.stringify(toParse).replace(/"/g, '\\"');
};
