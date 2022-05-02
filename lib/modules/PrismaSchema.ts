import { PrismaModel } from "@/modules/PrismaModel";

import { exportSchema } from "@/util/export";
import { parseKeyValueBlock } from "@/util/blocks";

import { PrismaDataSourceOptions } from "@/@types/prisma-datasource";
import { PrismaGeneratorOptions } from "@/@types/prisma-generator";

export class PrismaSchema {
	private models: Map<string, PrismaModel> = new Map();
	
	constructor(
		private readonly datasource: PrismaDataSourceOptions,
		private readonly generator: PrismaGeneratorOptions
	) {};

	private parseDataSource() {
		return parseKeyValueBlock("datasource", "database", Object.entries(this.datasource));
	};
	
	private parseGenerator() {
		return parseKeyValueBlock("generator", "client", Object.entries(this.generator));
	};

	public createMixin() {
		const model = new PrismaModel(this);
		return model;
	};

	public createModel(modelName: string) {
		const model = new PrismaModel(this, modelName);
		this.models.set(modelName, model);
		return model;
	};

	public toString() {
		const models = [
			this.parseDataSource(),
			this.parseGenerator(),
			...this.models.values()
		];
		
		return models.map((model) => model.toString()).join("\n\n");
	};

	public export(filepath: string, filename: string) {
		exportSchema(filepath, filename, this);
	}
};