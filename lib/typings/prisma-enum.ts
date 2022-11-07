export interface PrismaEnumOptions {
  map?: string;
}

export type Enum<E> = Record<keyof E, number | string> & { [k: number]: string };
