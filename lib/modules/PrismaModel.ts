import { PrismaModelField } from "@/modules/PrismaModelField";
import { handleOptions } from "@/util/options";

import { PrismaFieldTypeName } from "@/@types/prisma-field";
import { BooleanFieldOptions, DateTimeFieldOptions, FieldOptions, FloatFieldOptions, IntFieldOptions, StringFieldOptions } from "@/@types/prisma-type-options";

export class PrismaModel {
	private fields: Map<string, PrismaModelField> = new Map();
	
	constructor(public readonly name: string) {}

	private createField(fieldName: string, type: PrismaFieldTypeName, options: FieldOptions) {
		const field = new PrismaModelField(fieldName, type);
		handleOptions(field, options);
		this.fields.set(fieldName, field);
		return this;
	}

	string(fieldName: string, options: StringFieldOptions) {
		return this.createField(fieldName, "String", options);
	}

	int(fieldName: string, options: IntFieldOptions) {
		return this.createField(fieldName, "Int", options);
	}

	float(fieldName: string, options: FloatFieldOptions) {
		return this.createField(fieldName, "Float", options);
	}

	boolean(fieldName: string, options: BooleanFieldOptions) {
		return this.createField(fieldName, "Boolean", options);
	}

	dateTime(fieldName: string, options: DateTimeFieldOptions) {
		return this.createField(fieldName, "DateTime", options);
	}

	getFields() {
		return [...this.fields.values()].map((field) => field.toTokenArray());
	}
}