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
  entries: [string, string | { env: string }][]
) => {
  const tokenPadding = Math.max(...entries.map(([key]) => key.length));
  const body = entries
    .map(([key, value]) => {
      if (key === "url" && typeof value !== "string" && "env" in value) {
        return `  ${key.padEnd(tokenPadding)} = env("${value.env}")`;
      }

      return typeof value === "string"
        ? `  ${key.padEnd(tokenPadding)} = "${value}"`
        : `  ${key.padEnd(tokenPadding)} = ${JSON.stringify(value)}`;
    })
    .join("\n");

  return [`${keyword} ${name} {`, body, "}"].join("\n");
};
