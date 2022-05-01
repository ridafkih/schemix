import { PrismaModelField } from "@/modules/PrismaModelField";

import { FieldOptions } from "@/@types/prisma-type-options";

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