import { PrismaScalarField } from "@/modules/PrismaScalarField";

import { FieldOptions, RelationalFieldOptions } from "@/@types/prisma-type-options";
import { PrismaRelationalField } from "@/modules/PrismaRelationalField";

export const handleScalarOptions = <T extends FieldOptions>(field: PrismaScalarField, options: T) => {	
	const propertyMap: Record<string, keyof PrismaScalarField> = {
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

export const handleRelationalOptions = <T extends RelationalFieldOptions>(field: PrismaRelationalField, options: T) => {	
	const propertyMap: Record<string, keyof PrismaRelationalField> = {
		optional: "setOptional",
		list: "setList",
		map: "mapTo"
	};

	for (const [key, value] of Object.entries(options))
		field[propertyMap[key]]?.(value);
};