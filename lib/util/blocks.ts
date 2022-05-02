/**
 * Takes an object and turns it into a valid key-value block.
 * @param keyword The keyword for the block.
 * @param name The name of the block.
 * @param entries An object containing the entries.
 * @returns The key-value block string.
 */
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
