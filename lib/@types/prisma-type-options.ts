type DefaultFieldOptions = {
  map?: string;
  raw?: string;
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
) & { map?: string };

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
  onDelete?: "Cascade" | "Restrict" | "NoAction";
  onUpdate?: "Cascade" | "Restrict" | "NoAction";
  name?: string;
} & DefaultFieldOptions;

export type EnumFieldOptions = (
  | {
      default?: string;
      list?: never;
      optional?: true;
    }
  | {
      default?: never;
      list?: true;
      optional?: never;
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
