import { PrismaModelField } from "@/modules/PrismaModelField";

import { PrismaFieldTypeName } from "@/@types/prisma-field";
import { FieldOptions } from "@/@types/prisma-type-options";

export const addOptionsType = 
	<V extends PrismaFieldTypeName, T>(options: T, type: V) => 
		({ ...options, type });

export const handleOptions = <T extends FieldOptions>(field: PrismaModelField, options: T) => {	
	const propertyMap: Record<string, keyof PrismaModelField> = {
		id: "setAsId",
		optional: "setOptional",
		list: "setList",
		unique: "setUnique",
		default: "setDefault",
		map: "mapTo",
		updatedAt: "setToUpdatedAt"
	};

	for (const [key, value] of Object.entries(options))
		field[propertyMap[key]](value);
};