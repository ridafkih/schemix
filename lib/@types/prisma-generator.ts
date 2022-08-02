export interface PrismaGeneratorOptions {
  provider: string;
  name?: string;
  output?: string;
  previewFeatures?: string[];
  engineType?: "library" | "binary";
  binaryTargets?: string[];
}
