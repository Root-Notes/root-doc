export type Data = { [key: string]: any };
export type DocumentContextType = {
    data: Data;
    form: Data;
    onFormChange: (data: Data) => void;
};

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

export type ElementProps<T> = Omit<T, "type" | "supertype" | "children"> & {
    children?: JSX.Element | JSX.Element[];
};
export type FieldProps<T> = ElementProps<T> & {
    value: any;
    onChange: (value: any) => void;
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

// Element Types
export interface GroupElement extends Element {
    type: "group";
    children: Renderables[];
}

export interface TextElement extends Element {
    type: "text";
    content: DataItem;
}

// Field Types
export interface TextField extends Field {
    type: "textField";
    placeholder?: DataItem;
}

// Source Types
export interface ArraySource extends Source {
    type: "array";
    array: DataItem;
}

// Groups
export type Elements = GroupElement | TextElement | TextField;
export type Sources = ArraySource;
export type Renderables = Elements | Sources;
