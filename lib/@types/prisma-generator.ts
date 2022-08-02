export interface PrismaGeneratorOptions {
  provider: string;
  name?: string;
  output?: string;
  previewFeatures?: string[];
  engineType?: "library" | "binary";
  binaryTargets?: string[];
  [key: string]: string | string[] | undefined;
}

export type PrismaMultiGeneratorOptions = Array<
  Omit<PrismaGeneratorOptions, "name"> & { name: string }
>;
