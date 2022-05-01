import { PrismaModelField } from "@/modules/PrismaModelField";
import { handleOptions } from "@/util/options";

import { PrismaFieldTypeName } from "@/@types/prisma-field";
import { BooleanFieldOptions, DateTimeFieldOptions, FieldOptions, FloatFieldOptions, IntFieldOptions, StringFieldOptions } from "@/@types/prisma-type-options";

export class PrismaModel {
	private fields: Map<string, PrismaModelField> = new Map();
	
	constructor(public readonly name: string) {}

	public string(fieldName: string, options: StringFieldOptions) {
		return this.createField(fieldName, "String", options);
	}

	public int(fieldName: string, options: IntFieldOptions) {
		return this.createField(fieldName, "Int", options);
	}

	public float(fieldName: string, options: FloatFieldOptions) {
		return this.createField(fieldName, "Float", options);
	}

	public boolean(fieldName: string, options: BooleanFieldOptions) {
		return this.createField(fieldName, "Boolean", options);
	}

	public dateTime(fieldName: string, options: DateTimeFieldOptions) {
		return this.createField(fieldName, "DateTime", options);
	}
	
	public toString() {
		return [
			`model ${this.name} {`,
			this.parseFields(),
			"}"
		].join("\n")
	}

	private createField(fieldName: string, type: PrismaFieldTypeName, options: FieldOptions) {
		const field = new PrismaModelField(fieldName, type);
		handleOptions(field, options);
		this.fields.set(fieldName, field);
		return this;
	}

	private parseFields() {
		const fields = [...this.fields.values()].map((field) => field.toTokenArray());
		const mostTokens = Math.max(...fields.map(({ length }) => length))
		const paddings = Array(mostTokens).fill(0);

		for (let i = 0; i < mostTokens; i++)
			for (const tokens of fields)
				if (!tokens[i]) continue
				else
					paddings[i] = tokens[i].length > paddings[i] 
						? tokens[i].length
						: paddings[i]

		return fields.map((tokens) => {
			return "  " + tokens.map((token, index) => token.padEnd(paddings[index])).join(" ")
		}).join("\n")
	}
}