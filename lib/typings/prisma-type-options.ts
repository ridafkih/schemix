export type CommentTypes = "///" | "//";
export type Comment = `${CommentTypes} ${string}`;

export type DefaultFieldOptions = {
  comments?: Comment[];
  map?: string;
  raw?: string;
  ignore?: boolean;
};

export type StringFieldOptions = (
  | {
      id?: never;
      default?:
        | string
        | ({ uuid?: true; cuid?: never } | { uuid?: never; cuid?: true });
      unique?: true;
      optional?: true;
      list?: never;
    }
  | {
      id?: true;
      default?:
        | string
        | ({ uuid?: true; cuid?: never } | { uuid?: never; cuid?: true });
      unique?: true;
      optional?: never;
      list?: never;
    }
  | {
      id?: never;
      default?: never;
      unique?: never;
      optional?: never;
      list?: true;
    }
) &
  DefaultFieldOptions;

export type IntFieldOptions = (
  | {
      id?: true;
      default?: number | { autoincrement: true };
      unique?: true;
      optional?: never;
      list?: never;
    }
  | {
      id?: never;
      default?: number | { autoincrement: true };
      unique?: true;
      optional?: true;
      list?: never;
    }
  | {
      id?: never;
      default?: never;
      optional?: never;
      unique?: never;
      list?: true;
    }
) &
  DefaultFieldOptions;

export type FloatFieldOptions = (
  | {
      default?: number;
      optional?: true;
      unique?: true;
      list?: never;
    }
  | {
      default?: never;
      optional?: never;
      unique?: never;
      list?: true;
    }
) &
  DefaultFieldOptions;

export type DecimalFieldOptions = (
  | {
      precision?: [number, number];
      default?: number;
      optional?: true;
      unique?: true;
      list?: never;
    }
  | {
      precision?: [number, number];
      default?: never;
      optional?: never;
      unique?: never;
      list?: true;
    }
) &
  DefaultFieldOptions;

export type BooleanFieldOptions = (
  | {
      default?: boolean;
      optional?: true;
      list?: never;
    }
  | {
      default?: never;
      optional?: never;
      list?: true;
    }
) &
  DefaultFieldOptions;

export type DateTimeFieldOptions = {
  default?: { now: true };
  updatedAt?: true;
  optional?: true;
} & DefaultFieldOptions;

export type JsonFieldOptions = (
  | {
      default?: object | string | undefined;
      optional?: true;
      list?: never;
    }
  | {
      default?: never;
      optional?: never;
      list?: true;
    }
) &
  DefaultFieldOptions;

type ReferentialAction =
  | "Cascade"
  | "Restrict"
  | "NoAction"
  | "SetNull"
  | "SetDefault";
export type RelationalFieldOptions = (
  | {
      list?: true;
      optional?: never;
    }
  | {
      list?: never;
      optional?: true;
    }
) & {
  references?: string[];
  fields?: string[];
  onDelete?: ReferentialAction;
  onUpdate?: ReferentialAction;
  name?: string;
} & DefaultFieldOptions;

export type EnumFieldOptions = (
  | {
      default?: string;
      list?: never;
      optional?: true;
      unique?: true;
    }
  | {
      default?: never;
      list?: true;
      optional?: never;
      unique?: never;
    }
) &
  DefaultFieldOptions;

export type FieldOptions =
  | StringFieldOptions
  | IntFieldOptions
  | FloatFieldOptions
  | BooleanFieldOptions
  | DateTimeFieldOptions
  | JsonFieldOptions
  | EnumFieldOptions;

export type CompositeIDFieldOptions = {
  name?: string;
  fields: string[];
  map?: string;
};

export type CompositeUniqueFields = string[];
export type CompositeUniqueOptions = {
  fields: CompositeUniqueFields;
  map?: string;
};

export type CompositeUniqueFieldOptions =
  | CompositeUniqueOptions
  | CompositeUniqueFields;

export type ModelMapOptions =
  | {
      name: string;
    }
  | string;
