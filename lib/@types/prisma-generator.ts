export interface PrismaGeneratorOptions {
  provider: string;
  output?: string;
  previewFeatures?: string[];
  engineType?: "library" | "binary";
  binaryTargets?: string[];
}
