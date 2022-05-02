export const parseKeyValueBlock = (
  keyword: string,
  name: string,
  entries: [string, string][]
) => {
  const body = entries
    .map(([key, value]) => {
      return typeof value === "string"
        ? `  ${key} = "${value}"`
        : `  ${key} = ${JSON.stringify(value)}`;
    })
    .join("\n");

  return [`${keyword} ${name} {`, body, "}"].join("\n");
};
