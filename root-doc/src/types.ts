import { Renderables } from "./spec/types";

export type DataItem_Literal =
    | string
    | number
    | boolean
    | null
    | DataItem_Literal[];
export type DataItem_Complex =
    | {
          supertype: "data";
          type: "data";
          path: string;
      }
    | {
          supertype: "data";
          type: "form";
          field: string;
      };
export type DataItem = DataItem_Literal | DataItem_Complex;

export type ParseableFunction = {
    code: string;
    arguments: { [key: string]: DataItem };
};

// Base element types
export interface Element {
    supertype: "element";
    type: string;
    condition?: ParseableFunction | DataItem;
}

export interface Source {
    supertype: "source";
    type: string;
    condition?: ParseableFunction | DataItem;
    renderer: Renderables[];
    root: DataItem;
}

export interface Field extends Element {
    field: string;
}
