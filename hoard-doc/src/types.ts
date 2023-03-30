export type Data = { [key: string]: any };
export type DocumentContextType = [Data, (data: Data) => void];

export type DataItem_Literal =
    | string
    | number
    | boolean
    | null
    | DataItem_Literal[];
export type DataItem_Complex = {
    supertype: "data";
    type: "data";
    path: string;
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
}

export interface Field extends Element {
    field: string;
}

// Element Types
export interface GroupElement extends Element {
    type: "group";
    children: Renderables;
}

export interface TextElement extends Element {
    type: "text";
    content: DataItem;
}

// Field Types
export interface TextField extends Field {
    placeholder: DataItem;
}

// Groups
export type Elements = GroupElement | TextElement | TextField;
export type Renderables = Elements;
