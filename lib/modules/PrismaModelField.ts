import { PrismaFieldAttribute, PrismaFieldModifier, PrismaFieldTypeName } from "@/@types/prisma-field";

export class PrismaModelField {
	private attributes: Map<string, PrismaFieldAttribute> = new Map();
	private modifier: PrismaFieldModifier = "";
	
	constructor(
		private readonly name: string,
		private type: PrismaFieldTypeName
	) {}

	setOptional() {
		this.modifier = "?";		
		return this;
	};

	setList() {
		this.modifier = "[]";
		return this;
	};

	setAsId() {
		this.attributes.set("id", "@id");
		return this;
	};

	setUnique() {
		this.attributes.set("unique", "@unique");
		return this;
	};
	
	setToUpdatedAt() {
		this.attributes.set("updatedAt", "@updatedAt");
		return this;
	};

	setDefault(defaultValue: string | number | { cuid: boolean, uuid: boolean, now: boolean }) {
		const setDefaultValue = (value: string) => this.attributes.set("default", `@default(${value})`);
		switch (typeof defaultValue) {
			case "object":
				const [prismaFunc] = Object.entries(defaultValue).find(([_key, value]) => value) || [];
				setDefaultValue(`${prismaFunc}()`)
				break;
			case "string":
				setDefaultValue(`"${defaultValue}"`)
				break;
			default:
				setDefaultValue(defaultValue.toString())
		}
		
		return this;
	};

	mapTo(fieldName: string) {
		this.attributes.set("map", `@map("${fieldName}")`);
		return this;
	};

	toTokenArray() {
		const { name, type, modifier, attributes } = this;
		return [name, type + modifier, ...attributes.values()] as string[];
	};
};